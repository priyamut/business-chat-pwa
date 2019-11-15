import React from "react";
import Client from "@stomp/stompjs";
import PropTypes from "prop-types";
import Lo from "lodash";

class StompClient extends React.Component {

  static defaultProps = {
    onConnect: () => { },
    onDisconnect: () => { },
    getRetryInterval: (count) => { return 1000 * count; },
    options: {},
    headers: {},
    subscribeHeaders: {},
    autoReconnect: true,
    debug: false
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object,
    topics: PropTypes.array.isRequired,
    onConnect: PropTypes.func,
    getState:PropTypes.func,
    onDisconnect: PropTypes.func,
    getRetryInterval: PropTypes.func,
    autoReconnectionAction: PropTypes.func,
    onMessage: PropTypes.func.isRequired,
    headers: PropTypes.object,
    subscribeHeaders: PropTypes.object,
    autoReconnect: PropTypes.bool,
    debug: PropTypes.bool,
    heartbeat: PropTypes.number,
    heartbeatIncoming: PropTypes.number,
    heartbeatOutgoing: PropTypes.number,
    reconnectMinimumTimeInSeconds: PropTypes.number,
    reconnectMaxRandomAdditiveInSeconds: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      connectionRequestInProgess: false,
      errorInconnection:false
    };

    this.subscriptions = new Map();
    this.retryCount = 0;
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.connected) {
      // Subscribe to new topics
      Lo.difference(nextProps.topics, this.props.topics)
        .forEach((newTopic) => {
          this._log("Subscribing to topic: " + newTopic);
          this.subscribe(newTopic);
        });

      // Unsubscribe from old topics
      Lo.difference(this.props.topics, nextProps.topics)
        .forEach((oldTopic) => {
          this._log("Unsubscribing from topic: " + oldTopic);
          this.unsubscribe(oldTopic);
        });
    }
  }

  render() {
    return null;
  }

  _initStompClient = () => {
    // Websocket held by stompjs can be opened only once
    this.client = Client.client(this.props.url);
    if (this.props.heartbeat) {
      this.client.heartbeat.outgoing = this.props.heartbeat;
      this.client.heartbeat.incoming = this.props.heartbeat;
    }
    if (Object.keys(this.props).includes("heartbeatIncoming")) {
      this.client.heartbeat.incoming = this.props.heartbeatIncoming;
    }
    if (Object.keys(this.props).includes("heartbeatOutgoing")) {
      this.client.heartbeat.outgoing = this.props.heartbeatOutgoing;
    }
    if (!this.props.debug) {
      this.client.debug = () => { };
    }
  }

  _cleanUp = () => {
    this.setState({ connected: false });
    this.retryCount = 0;
    this.subscriptions.clear();
  }

  _log = (msg) => {
    if (this.props.debug) {
      console.log(msg);
    }
  }

  connect = () => {
    if (this.state.connected){
      return
    }

    var d = new Date();

    if(!this.state.connectionRequestInProgess){
      console.log(`--- Time : ${d} Message : Attempting connection --- `)
      this.setState({ connectionRequestInProgess: true });
    }else{
      console.log(`--- Time : ${d} Message : Connection request in progress. ---`)
      return 
    }

    this._timeoutId = null

    this._initStompClient();

    this.client.connect(this.props.headers || {}, () => {
      console.log("Connected")
      this.setState({ connected: true , connectionRequestInProgess: false});
      this.props.topics.forEach((topic) => {
        this.subscribe(topic);
      });
      this.props.onConnect();
      this.props.getState(this.state.connected,this.state.errorInconnection);
    }, (error) => {
      console.log('Error while connecting stomp', error);
      this.setState({errorInconnection:true, connectionRequestInProgess: false});
      if (this.state.connected) {
        this._cleanUp();
        // onDisconnect should be called only once per connect
        this.props.onDisconnect();
      }
      if (this.props.autoReconnect) {
        this.props.autoReconnectionAction();

        if(this._timeoutId == null){
          var newRetryCount = this.retryCount++

          var min=1; 
          var max= this.props.reconnectMaxRandomAdditiveInSeconds;  
  
          var random  = Math.floor(Math.random() * (+max - +min)) + +min; 
  
          var newRetryInterval =  this.props.reconnectMinimumTimeInSeconds + (random * 1000)
  
          console.log(`--- Next reconnect in ${newRetryInterval} milliseconds ---`)
          this._timeoutId = setTimeout(this.connect, newRetryInterval);
        }
      
      }
      this.props.getState(this.state.connected,this.state.errorInconnection);
    });
   // const status={'connected':this.state.connected,'errorInconnect':this.props.errorInconnection}
   

  }



  disconnect = () => {
    // On calling disconnect explicitly no effort will be made to reconnect
    // Clear timeoutId in case the component is trying to reconnect
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null
    }

    if (this.state.connected) {
      this.subscriptions.forEach((subid, topic) => {
        this.unsubscribe(topic);
      });
      this.client.disconnect(() => {
        this._cleanUp();
        this.props.onDisconnect();
        this._log("Stomp client is successfully disconnected!");
      });
    }
  }

  subscribe = (topic, headers) => {
    if (!this.subscriptions.has(topic)) {
      let sub = this.client.subscribe(topic, (msg) => {
        this.props.onMessage(JSON.parse(msg.body), topic);
      }, headers);
      this.subscriptions.set(topic, sub);
    }
  }

  unsubscribe = (topic, headers) => {
    let sub = this.subscriptions.get(topic);
    this.client.unsubscribe(topic, headers);
    //sub.unsubscribe();
    this.subscriptions.delete(topic);
  }

  // Below methods can be accessed by ref attribute from the parent component
  sendMessage = (topic, msg, opt_headers = {}) => {
    if (this.state.connected) {
      this.client.send(topic, opt_headers, msg);
    } else {
      console.error("Send error: StompClient is disconnected");
    }
  }
}

export default StompClient;