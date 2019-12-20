import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import "assets/vendors/style";
import defaultTheme from "./themes/defaultTheme";
import AppLocale from "../lngProvider";

import MainApp from "app/index";
import asyncComponent from "util/asyncComponent";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { getUser, setInitUrl } from "../actions/Auth";
import RTL from "util/RTL";
import axios from "util/Api";
import AddToHomescreen from "react-add-to-homescreen";
import StompClient from "./../custom-plugins/react-stomp-client";

import { SocketConfig } from "./../helpers/AppConstant";
import Conversation from "components/chatPanel/Conversation/index";
import moment from "moment";
import { isIOS, isMobile } from "react-device-detect";
import { userSignOut } from "actions/Auth";

import {
  updateConversation,
  fetchChatUser,
  readAlltheChatMessages,
  stompClientSendMessage,
  updateLiveSupportRequest
} from "actions/Chat";
import { uuid } from "uuidv4";
const RestrictedRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor() {
    super();
    this.clientRef = React.createRef();
    this.state = {
      sessionDetails: {},
      globalVariables: {},
      conversation: {}
    };

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

    //this.setTimeout();
  }

  clearTimeout = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };

  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, 3600000);
    this.logoutTimeout = setTimeout(this.logout, 2147483647); // 30 * 24 * 60 * 60000
  };

  warn() {
    //alert("You will be logged out automatically in 1 minute.");
    if (this.clientRef) {
      this.clientRef.disconnect();
    }
  }

  logout() {
    this.props.userSignOut();
    this.destroy();
  }

  destroy = () => {
    this.clearTimeout();
  };

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    let businessId = localStorage.getItem("businessId");

    const config = {
      headers: {
        Authorization: "b72cc0c9-c5a1-4aae-a3aa-e34ff7160feb",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors"
      }
    };

    axios
      .post("business/v1/sessions", { businessId }, config)
      .then(({ data }) => {
        this.setState(
          {
            sessionDetails: data
          },
          () => {
            if (this.clientRef) {
              let clientRef = this.clientRef;
              clientRef["sessionDetails"] = this.state.sessionDetails;
              this.props.stompClientSendMessage(clientRef);
            }
          }
        );
      })
      .catch(function(error) {
        console.log("Error****:", { error });
      });
    //}
    (function () {
      var timestamp = new Date().getTime();
      function checkResume() {
        var current = new Date().getTime();
        if (current - timestamp > 5000 && navigator.onLine) {
          var event = document.createEvent("Events");
          event.initEvent("resume", true, true);
          document.dispatchEvent(event);
        }
        if (navigator.onLine) {
          timestamp = current;
        }
      }
      window.setInterval(checkResume, 5000);
    })();

  }

  handleAddToHomescreen = () => {
    alert('1. Open Share menu\n2. Tap on "Add to Home Screen" button');
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      //axios.defaults.headers.common['Authorization'] = nextProps.token;
    }
    if (nextProps.token && !nextProps.authUser) {
      this.props.getUser();
    }
    if (
      this.props.subScribeUSerData != nextProps.subScribeUSerData &&
      nextProps.subScribeUSerData.businessAgents &&
      nextProps.subScribeUSerData.businessAgents.length > 0
    ) {
      this.props.fetchChatUser(
        nextProps.subScribeUSerData.businessAgents["0"].id
      );
    }
  }

  componentDidMount() {
    const { subScribeUSerData } = this.props;
    if (subScribeUSerData != null) {
      this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
    }
  }
  render() {
    const { sessionDetails, globalVariables } = this.state;
    const {
      match,
      location,
      locale,
      token,
      initURL,
      isDirectionRTL,
      subScribeUSerData
    } = this.props;
    if (isMobile) {
      if (location.pathname === "/") {
        if (token === null) {
          return <Redirect to={"/signin"} />;
        } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
          return <Redirect to={"/app/chat"} />;
        } else {
          return <Redirect to={initURL} />;
        }
      }
    } else {
      if (location.pathname.indexOf("/app/chat/") == 0) {
        let locate = location.pathname.replace("/app/chat/", "");
        window.open(
          `https://dev-business.agentz.ai/contacts/${locate}`,
          "_self"
        );
      }
    }

    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      applyTheme.direction = "ltr";
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      // <React.Fragment>

      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main">
                <Switch>
                  <RestrictedRoute
                    path={`${match.url}app`}
                    token={token}
                    component={MainApp}
                  />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route
                    component={asyncComponent(() =>
                      import("components/Error404")
                    )}
                  />
                </Switch>
                {sessionDetails.id && (
                  <StompClient
                    url={`wss://dev-websocket.agentz.ai/websocket?auth=${sessionDetails.id}`}
                    heartbeat={1000 * 30}
                    topics={[
                      `${SocketConfig.subscribeTopicPrefix}/${sessionDetails.businessId}`,
                      `${SocketConfig.subscribeTopicPrefix}/BUSINESS-${sessionDetails.businessId}`,
                      `${
                        SocketConfig.subscribeTopicPrefix
                      }/businessChat-${subScribeUSerData &&
                        subScribeUSerData.businessAgents &&
                        subScribeUSerData.businessAgents.length > 0 &&
                        subScribeUSerData.businessAgents["0"].id}`
                    ]} //${sessionInfo.businessId}
                    ref={client => {
                      this.clientRef = client;
                    }}
                    onMessage={message => this.onMessageReceive(message)}
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
    console.log({ response });
    if (response.hasOwnProperty("type")) {
      const { subScribeUSerData, updatedLiveSupportRequestList } = this.props;
      if (
        this.props.conversation &&
        this.props.conversation.user &&
        response.contactMasterId == this.props.conversation.user.id
      ) {
        let conversation = JSON.parse(JSON.stringify(this.props.conversation));

        let liveSupport = JSON.parse(
          JSON.stringify(updatedLiveSupportRequestList)
        );

        var updatedConversation;
        var newLiveSupportRequest;
        if (
          response.type === "INCOMING_SMS" ||
          response.type === "BUSINESS_SMS"
        ) {
          updatedConversation = conversation.Sms.concat({
            id: response.id,
            messageType: response.type,
            incomingSms: {
              message: JSON.parse(response.text).message,
              fromNumber: JSON.parse(response.text).fromNumber
            },
            time: response.createdDate
          });
        } else {
          if (response.type === "OUTGOING_SMS") {
            updatedConversation = conversation.Sms.concat({
              id: response.id,
              messageType: response.type,
              outGoingSms: {
                message: JSON.parse(response.text).message,
                toNum: JSON.parse(response.text).smsRecipients[0].toNum
              },
              time: response.createdDate
            });
          }
          if (response.type === "TALK_TO_HUMAN_REQUEST") {
            updatedConversation = conversation.Sms.concat({
              id: response.id,
              messageType: response.type,
              conversationId: response.conversationId,
              time: response.createdDate || moment().format()
            });

            newLiveSupportRequest = liveSupport.concat({
              id: response.contactMasterId,
              conversationId: response.conversationId,
              pwsSessionId: this.state.sessionDetails.id
            });
            this.props.updateLiveSupportRequest(newLiveSupportRequest);
          }
          if (
            response.type === "TALK_TO_HUMAN_JOINED" ||
            response.type === "FORCE_JOINED"
          ) {
            updatedConversation = conversation.Sms.concat({
              id: response.id,
              messageType: response.type,
              conversationId: response.conversationId,
              time: response.createdDate || moment().format()
            });

            newLiveSupportRequest = liveSupport.filter(
              el => el.id !== response.contactMasterId
            );
            this.props.updateLiveSupportRequest(newLiveSupportRequest);
          }
          if (response.type === "TALK_TO_HUMAN_EXIT") {
            updatedConversation = conversation.Sms.concat({
              id: response.id,
              messageType: response.type,
              conversationId: response.conversationId,
              time: response.createdDate || moment().format()
            });

            newLiveSupportRequest = liveSupport.filter(
              el => el.id !== response.contactMasterId
            );
            this.props.updateLiveSupportRequest(newLiveSupportRequest);
          }
        }
        conversation.Sms = [
          ...new Map(
            updatedConversation.map(item => [item["id"], item])
          ).values()
        ];
        this.props.updateConversation(conversation);
        this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
        this.props.readAlltheChatMessages(this.props.conversation.user.id);
      } else if (
        this.props.conversation &&
        this.props.conversation.user &&
        this.props.conversation.user.id
      ) {
        this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
      }
    }
  };
}

const mapStateToProps = ({ settings, auth, chatData }) => {
  const { sideNavColor, locale, isDirectionRTL } = settings;
  const { authUser, token, initURL, subScribeUSerData } = auth;
  const { conversation, updatedLiveSupportRequestList } = chatData;
  return {
    sideNavColor,
    token,
    locale,
    isDirectionRTL,
    authUser,
    initURL,
    subScribeUSerData,
    conversation,
    updatedLiveSupportRequestList
  };
};

export default connect(
  mapStateToProps,
  {
    setInitUrl,
    getUser,
    updateConversation,
    fetchChatUser,
    readAlltheChatMessages,
    userSignOut,
    stompClientSendMessage,
    updateLiveSupportRequest
  }
)(App);
