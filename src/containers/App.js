import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import "assets/vendors/style"
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from 'app/index';
import asyncComponent from 'util/asyncComponent';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {getUser, setInitUrl} from '../actions/Auth';
import RTL from 'util/RTL';
import axios from 'util/Api';
import AddToHomescreen from 'react-add-to-homescreen';
import StompClient from './../custom-plugins/react-stomp-client';

import {SocketConfig} 
from './../helpers/AppConstant';
import Conversation from 'components/chatPanel/Conversation/index';
import Moment from 'moment';
import {isIOS, isMobile} from 'react-device-detect';
import {userSignOut} from 'actions/Auth';

import {
  updateConversation,
  fetchChatUser,
  readAlltheChatMessages
} from 'actions/Chat';

const RestrictedRoute = ({component: Component, token, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      token
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;

  


class App extends Component {

  constructor(){
    super();
    this.state= {
      sessionDetails : {},
      globalVariables: {},
      conversation: {}
    }

    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
    
    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);

    

    this.setTimeout();
  }
 
  clearTimeout = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout =()=> {
    this.warnTimeout = setTimeout(this.warn, 3600000);
    this.logoutTimeout = setTimeout(this.logout,  2147483647);// 30 * 24 * 60 * 60000
  }


  warn() {
    //alert("You will be logged out automatically in 1 minute.");
    if(this.clientRef){
      this.clientRef.disconnect()
    }
  }

  logout() {
    this.props.userSignOut();
    this.destroy();
  }

  destroy =()=> {
    this.clearTimeout();
  }

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    let businessId = localStorage.getItem('businessId');
   
        const config = {
          headers: {
            'Authorization': "13c57fd4-5d93-4cdf-8f4d-20d035bb8ee3",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            "mode": "no-cors"
          }
        }
       
          axios.post('business/v1/sessions',{'businessId': 
          localStorage.getItem('businessId')}, config).then(({data}) => {
            this.setState({
              sessionDetails : data
            })
          }).catch(function (error) {
            console.log("Error****:", {error});
          });
        //}
  }

  handleAddToHomescreen = () => {
    alert('1. Open Share menu\n2. Tap on "Add to Home Screen" button');
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      //axios.defaults.headers.common['Authorization'] = nextProps.token;
    }
    if (nextProps.token && !nextProps.authUser) {
      this.props.getUser()
    }
    if(this.props.subScribeUSerData != nextProps.subScribeUSerData && nextProps.subScribeUSerData.businessAgents &&
      nextProps.subScribeUSerData.businessAgents.length >0){
      this.props.fetchChatUser(nextProps.subScribeUSerData.businessAgents["0"].id)
    }
  }

  componentDidMount(){
    const {subScribeUSerData} = this.props
    if(subScribeUSerData != null){
      this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
    }
  }
  render() {
    const {sessionDetails, globalVariables} = this.state;
    const {match, location, locale, token, initURL, isDirectionRTL,subScribeUSerData} = this.props;
    if(isMobile){
      if (location.pathname === '/') {
        if (token === null) {
          return ( <Redirect to={'/signin'}/> );
        } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
          return ( <Redirect to={'/app/chat'}/> );
        } else {
          return ( <Redirect to={initURL}/> );
        }
      }
    }else{
      if(location.pathname.indexOf('/app/chat/') ==0){
        let locate = location.pathname.replace('/app/chat/','');
        window.open(`https://business.agentz.ai/contacts/${locate}`, "_self");
      }
    }
    
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      // <React.Fragment>
        

      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">
                <Switch>
                <RestrictedRoute path={`${match.url}app`} token={token}
                                   component={MainApp}/>
                  <Route path='/signin' component={SignIn}/>
                  <Route path='/signup' component={SignUp}/>
                  <Route
                    component={asyncComponent(() => import('components/Error404'))}/>
                </Switch>
                {sessionDetails.id  && (  
            <StompClient
              url={`wss://demo2-websocket.agentz.ai/websocket?auth=${sessionDetails.id}`}
              heartbeat={1000 * 30}
              topics={[`${SocketConfig.subscribeTopicPrefix}/${sessionDetails.businessId}`,
              `${SocketConfig.subscribeTopicPrefix}/BUSINESS-${sessionDetails.businessId}`,
              `${SocketConfig.subscribeTopicPrefix}/businessChat-${subScribeUSerData && subScribeUSerData.businessAgents &&
                subScribeUSerData.businessAgents.length > 0 && subScribeUSerData.businessAgents["0"].id}`]} //${sessionInfo.businessId}
              ref={client => {
                this.clientRef = client;
              }}
              onMessage={(message) => this.onMessageReceive(message)}
              debug={false}
            />
          )}
         
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
      // </React.Fragment>
    );
  }

  
  onMessageReceive = response => {
    if(response.hasOwnProperty('text')){
    const {subScribeUSerData} = this.props
    if(this.props.conversation && this.props.conversation.user && 
        response.contactMasterId == this.props.conversation.user.id){
      let conversation = JSON.parse(JSON.stringify(this.props.conversation));
      const updatedConversation = conversation.Sms.concat({
        'messageType': response.type,
        'incomingSms': {message: JSON.parse(response.text).message,
          fromNumber: JSON.parse(response.text).fromNumber},
        'time': response.createdDate,
      });
      conversation.Sms = updatedConversation;
      this.props.updateConversation(conversation);
      this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
      this.props.readAlltheChatMessages(this.props.conversation.user.id);
    }else if(this.props.conversation && this.props.conversation.user && 
      this.props.conversation.user.id){
        this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
      }
  };
  }
}

const mapStateToProps = ({settings, auth, chatData}) => {
  const {sideNavColor, locale, isDirectionRTL} = settings;
  const {authUser, token, initURL,subScribeUSerData} = auth;
  const {conversation} = chatData;
  return {sideNavColor, token, locale, isDirectionRTL, authUser, initURL,subScribeUSerData,conversation}
};

  export default connect(mapStateToProps, {setInitUrl, getUser,updateConversation,fetchChatUser,readAlltheChatMessages,userSignOut})(App);