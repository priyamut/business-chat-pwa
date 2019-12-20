import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import Input from "@material-ui/core/Input";
import ChatUserList from "components/chatPanel/ChatUserList/index";
import Conversation from "components/chatPanel/Conversation/index";
import ContactList from "components/chatPanel/ContactList/index";
import SearchBox from "components/SearchBox";
import IntlMessages from "util/IntlMessages";
import MenuIcon from "@material-ui/icons/Menu";
import { setInitUrl } from "./../../../../actions/Auth";
import { Scrollbars } from "react-custom-scrollbars";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import axios from "util/Api";
import Pullable from "react-pullable";
import CloudOffIcon from '@material-ui/icons/CloudOff';
import {
  fetchChatUser,
  fetchChatUserConversation,
  filterContacts,
  filterUsers,
  hideLoader,
  onChatToggleDrawer,
  onSelectUser,
  submitComment,
  sendSms,
  updateMessageValue,
  updateSearchChatUser,
  userInfoState,
  readAlltheChatMessages,
  updateConversation
} from "actions/Chat";
import CustomScrollbars from "util/CustomScrollbars";
import { isIOS } from "react-device-detect";
import moment from "moment";
import { SocketConfig } from "./../../../../helpers/AppConstant";
import { uuid } from "uuidv4";

class ChatPanelWithRedux extends PureComponent {
  filterContacts = userName => {
    this.props.filterContacts(userName);
  };
  filterUsers = userName => {
    this.props.filterUsers(userName);
  };
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.submitComment();
    }
  };

  onSelectUser = user => {
    const { subScribeUSerData } = this.props;
    this.props.conversation.user = user;
    this.props.updateMessageValue("");
    this.setState({
      scrollFlg: true
    });
    this.props.onSelectUser(
      user,
      subScribeUSerData.businessAgents["0"].id,
      this.props.hideLoader
    );
    this.changeContactDetails(user);

    this.props.readAlltheChatMessages(user.id);
    this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
  };

  changeContactDetails(user) {
    var appendUrl = user['actualContactNo'] && user['actualContactNo'].split(',').length > 0 &&
      user['actualContactNo'].split(',')[0] ? user['actualContactNo'].split(',')[0] : user['id'];
    this.ChangeUrl("/app/chat/" + appendUrl);
    if (document.getElementById("selectedUser")) {
      var div = document.getElementById("selectedUser");
      div.innerHTML = user.name || user.emailId || user.contactNo;
    }
    if (document.getElementById("selectedContactNo")) {
      var div = document.getElementById("selectedContactNo");
      let contactNo = user.contactNo ? user.contactNo : "";
      div.innerHTML =
        user.name || user.emailId ? (contactNo ? contactNo : "") : "";
    }
    if (document.getElementById("phone")) {
      var anchor = document.getElementById("phone-anchor");
      anchor.href = `tel:${user.contactNo}`;
      document.getElementById("phone").style.display = "block";
    }
    //this.props.readAlltheChatMessages(user.id);
  }

  ChangeUrl(url) {
    if (typeof window.history.pushState != "undefined") {
      var obj = { Page: "page", Url: url };
      window.history.pushState(obj, obj.Page, obj.Url);
    } else {
      alert("Browser does not support HTML5.");
    }
  }

  submitComment = () => {
    const { subScribeUSerData, updatedLiveSupportRequestList } = this.props;
    if (
      this.props.message.trim().length > 0 &&
      !this.state.disabled &&
      subScribeUSerData &&
      subScribeUSerData.businessAgents &&
      subScribeUSerData.businessAgents.length > 0 && this.props.message.length <= 500
    ) {
      const paramData = {
        businessId: localStorage.getItem("businessId"),
        contactMasterId: this.props.conversation.user.id,
        message: this.props.message,
        toNumber: this.props.conversation.user.contactNo
      };
      this.props.submitComment(paramData);
      // this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
    } else if (this.props.message.length > 500) {
      let chatFooter = document.getElementsByClassName(
        "chat-textarea",
        "chat-main"
      );
      if (chatFooter && chatFooter[0] instanceof Element) {
        chatFooter[0].focus();
      }
    }

    let currenUserIdRequestingLiveSupport = updatedLiveSupportRequestList.find(
      o => o.id === this.props.conversation.user.id
    );
    if (currenUserIdRequestingLiveSupport) {
      this.sendThroughSms(
        currenUserIdRequestingLiveSupport.conversationId,
        this.props.stompClientRef.sessionDetails.id
      );
    }
  };

  componentDidMount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
    window.removeEventListener("resume",function(){
    })
    window.addEventListener("offline", this.updateOnlineStatus);
    window.addEventListener("online",function(){
      if(!isIOS){
        this.updateOnlineStatus();
      }
    });

    window.addEventListener("resume", function(){
      if(!this.state.resumeFlg){
        this.setState({
          resumeFlg: true
        })
        if(isIOS){
          this.updateOnlineStatus();
        }
      }
    }.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
    window.removeEventListener("resume",function(){
    })
  }

 
  updateOnlineStatus = event => {
    if (navigator.onLine) {
      if (this.props.conversation.user &&
        this.props.contactList && this.props.contactList.length > 0) {
        setTimeout(() => {
          this.handleconversationSynconOffline();
        }, 6000);
      }

      if (this.props.contactList && this.props.contactList.length === 0 && this.props.subScribeUSerData
        && this.props.subScribeUSerData.businessAgents && this.props.subScribeUSerData.businessAgents['0']) {
        this.props.fetchChatUser(this.props.subScribeUSerData.businessAgents["0"].id);
      }
      console.log("device is now online");
      this.setState({
        networkFlag: true
      })
    } else if (!navigator.onLine) {
      console.log("device is now offline");
      this.setState({
        networkFlag: false,
        resumeFlg: false
      })
    }
  };

  handleconversationSynconOffline = () => {
    const {subScribeUSerData } = this.props;
    var unsentMessages = [];
    let conversation = JSON.parse(JSON.stringify(this.props.conversation));
    if (conversation && conversation.Sms === undefined) {
      this.onSelectUser(this.props.conversation.user);
    } else if (conversation && conversation.Sms && conversation.Sms.length > 0) {
      unsentMessages = conversation.Sms.filter((item) =>
        item.type === true);
      axios.get(`consumer/v1/${conversation.user.id}/sms?businessId=${subScribeUSerData.businessAgents["0"].id}`, {
        headers: {
          "idToken": JSON.parse(localStorage.getItem("idToken")),
          "authorization": JSON.parse(localStorage.getItem("accessToken")),
          "agentDomain": JSON.parse(localStorage.getItem("businessMap"))[0].name
        }
      }).then(({ data }) => {
        if (data) {
          var updatedConversation;
          data.user = conversation.user;
          data.Sms = data.Sms.reverse();
          if (unsentMessages.length > 0) {
            data.Sms = data.Sms.concat(unsentMessages);
            updatedConversation = data;
            if (updatedConversation) {
              this.props.updateConversation(updatedConversation);
            }
          }else{
            if(data.Sms.length !== this.props.conversation.Sms.length){
              updatedConversation = data;
              this.props.updateConversation(updatedConversation);
            }
          }
        } else {

        }
      }).catch(function (error) {
      });
    }
  }
  handleCommentChange = event => {
    event.preventDefault();
    const content = event.target.value;
    //if (content.length <= 200) {
    this.updateMessageValue(event);
    //}
  };
  handleOnInput = event => {
    if (event.target instanceof Element) {
      event.target.style.height = "auto";
      var clientHeight = event.target.scrollHeight;
      if (clientHeight > 250) {
        clientHeight = 250;
      }
      event.target.style.height = clientHeight + "px";
      let chatFooter = document.getElementsByClassName(
        "chat-main-footer",
        "chat-main"
      );
      if (chatFooter && chatFooter[0] instanceof Element ) {
        chatFooter[0].style.minHeight = clientHeight + 32 + "px";
        chatFooter[0].style.lineHeight = clientHeight + 32 + "px";
      }
    }
  };
  scrollToBottom = () => {
    var scroll = document.getElementsByClassName(
      "chat-list-scroll",
      "chat-box-main"
    );
    if (scroll && scroll[0] instanceof Element) {
      scroll = scroll[0].children[0];
      scroll.scrollTop = scroll.scrollHeight;
    }
  };
  updateMessageValue = evt => {
    this.props.updateMessageValue(evt.target.value);
  };

  scrollComponentTobottom = () => {
    if (this.state.scrollFlg) {
      this.scrollComponent.scrollToBottom();
      this.setState({
        scrollFlg: false
      });
      this.changeStyle();
    }
  };

  Communication = () => {
    if (!this.props.conversation || this.props.conversation.length == 0) {
      return;
    }
    const { message, conversation } = this.props;
    const { Sms } = conversation;
    let selectedUser = conversation.user;
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        var day = moment(currentValue[key])
          .local()
          .format("dddd");
        var value =
          day +
          ", " +
          moment(currentValue[key])
            .local()
            .format("MMM Do YYYY");
        var formedDate = moment(currentValue[key]).local();

        var formedCurrentDate = moment().local();
        if (
          formedDate.year() === formedCurrentDate.year() &&
          formedDate.month() === formedCurrentDate.month()
        ) {
          if (formedDate.date() === formedCurrentDate.date()) {
            value = "Today";
          } else if (formedDate.date() === formedCurrentDate.date() - 1) {
            value = "Yesterday";
          }
        }

        (result[value] = result[value] || []).push(currentValue);
        return result;
      }, {});
    };
    if (Sms.length > 0 && selectedUser.unreadMessage > 0) {
      var newSmsList = JSON.parse(JSON.stringify(Sms));
      var outgoingsmsIdx = 0;
      var indexFlg = false;
      newSmsList.reverse().forEach(function (message, index) {
        if (!indexFlg && message.messageType === 'OUTGOING_SMS') {
          outgoingsmsIdx = index + 1;
          return index;
        } else {
          indexFlg = true;
        }
      });
      var newMsgIdx = Sms.length - selectedUser.unreadMessage - outgoingsmsIdx;
      if (Sms.length > newMsgIdx) {
        var uniqueId = Sms[newMsgIdx]["id"];
        selectedUser["newMessageId"] = uniqueId;
      }
    }
    const conversationFormed = groupBy(Sms, "time");
    return (
      <>
        <div className="chat-main">
          <Scrollbars
            className="chat-list-scroll scrollbar"
            style={{ height: "calc(100vh - 222px)" }}
            onUpdate={this.scrollComponentTobottom}
            ref={c => {
              this.scrollComponent = c;
            }}
          >
            {Sms.length == 0 ? (
              <div
                className="loader-view"
                style={{
                  "margin-top": isIOS ? "-40px" : "0px",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                {/* <i className="zmdi zmdi-comments s-128 text-muted"/> */}

                {selectedUser.contactNo !== null &&
                  selectedUser.contactNo !== undefined &&
                  selectedUser.contactNo !== "" ? (
                    <React.Fragment>
                      <AnnouncementIcon className="s-128 text-muted" />
                      <h3 className="text-muted">
                        <IntlMessages id="chat.noMessageToShow" />
                      </h3>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <SpeakerNotesOffIcon className="s-128 text-muted" />
                      <h3 className="text-muted">
                        <IntlMessages id="chat.noContactNoForthisUser" />
                      </h3>
                    </React.Fragment>
                  )}
              </div>
            ) : (
                <Conversation
                  conversationData={conversationFormed}
                  selectedUser={selectedUser}
                  property={this.props}
                />
              )}
          </Scrollbars>
          {!navigator.onLine && (
            <span className="no-internet-span">
              {<IntlMessages id="chat.backtoOnline" />}</span>
          )}
          {this.props.message.length > 500 && (
            <span className="message-exceed-length">
              {<IntlMessages id="chat.maxLimit" />}</span>
          )}

          <div className="chat-main-footer">
            <div
              className="d-flex flex-row align-items-center"
              style={{ maxHeight: 51 }}
            >
              <div className="col">
                <div className="form-group">
                  <textarea style={{"-webkit-overflow-scrolling": "touch"}}
                    id="required"
                    className="border-0 form-control chat-textarea"
                    onKeyUp={this._handleKeyPress.bind(this)}
                    onInput={this.handleOnInput.bind(this)}
                    //onChange={this.updateMessageValue.bind(this)}
                    onChange={this.handleCommentChange.bind(this)}
                    noValidate
                    value={message}
                    autocorrect="off"
                    placeholder="Type and hit enter to send message"
                    ref={input => {
                      this.nameInput = input;
                    }}
                  />
                </div>
              </div>
              <div className="chat-sent">
                <IconButton
                  disabled={this.state.disabled}
                  onClick={this.submitComment.bind(this)}
                  aria-label="Send message"
                >
                  <i className="zmdi  zmdi-mail-send" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  };

  AppUsersInfo = () => {
    return (
      <div className="chat-sidenav-main">
        <div className="bg-grey lighten-5 chat-sidenav-header">
          <div className="chat-user-hd mb-0">
            <IconButton
              className="back-to-chats-button"
              aria-label="back button"
              onClick={() => {
                this.setState({
                  userState: 1
                });
              }}
            >
              <i className="zmdi zmdi-arrow-back" />
            </IconButton>
          </div>
          <div className="chat-user chat-user-center">
            <div className="chat-avatar mx-auto">
              <img
                src="https://via.placeholder.com/150x150"
                className="avatar avatar-shadow rounded-circle size-60 huge"
                alt="John Doe"
              />
            </div>

            <div className="user-name h4 my-2 text-white">Robert Johnson</div>
          </div>
        </div>
        <div className="cyan chat-sidenav-content">
          <CustomScrollbars
            className="chat-sidenav-scroll scrollbar"
            style={{
              height:
                this.props.width >= 1200
                  ? "calc(100vh - 328px)"
                  : "calc(100vh - 162px)"
            }}
          >
            <form className="p-4">
              <div className="form-group mt-4">
                <label>Mood</label>

                <Input
                  fullWidth
                  id="exampleTextarea"
                  multiline
                  rows={3}
                  onKeyUp={this._handleKeyPress.bind(this)}
                  onChange={this.updateMessageValue.bind(this)}
                  defaultValue="it's a status....not your diary..."
                  placeholder="Status"
                  margin="none"
                />
              </div>
            </form>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  getUpdatedUser = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        this.props.fetchChatUser(
          this.props.subScribeUSerData.businessAgents["0"].id
        );
      }, 1000);
    });
  };
  ChatUsers = () => {
    return (
      <div className="chat-sidenav-main">
        <div className="chat-sidenav-header">
          <div className="chat-user-hd">
            <div className="module-user-info d-flex flex-column justify-content-center">
              <div className="module-title">
                <h2
                  className="mb-0"
                  style={{
                    color: "#fff",
                    fontWeight: "500",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textTransform: "uppercase"
                  }}
                >
                  {localStorage.getItem("name")}
                </h2>
              </div>
            </div>
          </div>

          <div className="search-wrapper">
            <SearchBox
              placeholder="Search or start new chat"
              onChange={this.updateSearchChatUser.bind(this)}
              value={this.props.searchChatUser}
            />
          </div>
        </div>

        <div className="chat-sidenav-content">
          <AppBar position="static" className="no-shadow chat-tabs-header">
            <Pullable className="test" onRefresh={() => this.getUpdatedUser()}>
              <Tabs
                className="chat-tabs"
                value={this.state.selectedTabIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label={<IntlMessages id="chat.contacts" />} />
              </Tabs>
            </Pullable>
          </AppBar>
          <SwipeableViews
            index={this.state.selectedTabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <CustomScrollbars
              className="chat-sidenav-scroll scrollbar"
              style={{
                height:
                  this.props.width >= 1200
                    ? "calc(100vh - 328px)"
                    : "calc(100vh - 146px)"
              }}
            >
              {this.props.chatUsers.length === 0 ? (
                <div className="p-5" style={{ 'textAlign': 'center' }}>{this.props.userNotFound}</div>
              ) : (
                  <ChatUserList
                    chatUsers={this.props.chatUsers}
                    selectedSectionId={this.props.selectedSectionId}
                    onSelectUser={this.onSelectUser.bind(this)}
                  />
                )}
            </CustomScrollbars>
          </SwipeableViews>
        </div>
      </div>
    );
  };
  handleChange = (event, value) => {
    this.setState({ selectedTabIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ selectedTabIndex: index });
  };

  onTryAgain = ()=>{
    alert('No connection. You will be able to send messages as soon as you are back online.')
  };

  renderInit = selectedUser => {
    if (selectedUser === null && navigator.onLine) {
      return (
        <div
          className="loader-view"
          style={{ "margin-top": isIOS ? "-40px" : "0px" }}
        >
          <i className="zmdi zmdi-comment s-128 text-muted" />

          <Button
            className="d-block d-xl-none"
            color="primary"
            onClick={this.onChatToggleDrawer.bind(this)}
          >
            {<IntlMessages id="chat.selectContactChat" />}
          </Button>
        </div>)
    }
    if (selectedUser !== null) {
      return (
        <>
          {""}
          {this.Communication()}
        </>
      )
    }
    if (selectedUser === null && !navigator.onLine) {
      return (
        <div
          className="loader-view no-internet-tag"
          style={{ "margin-top": isIOS ? "-40px" : "0px" }}
        >
          <CloudOffIcon className="s-128 text-muted" />
          <h3 className="no-internet">
            {<IntlMessages id="chat.noInternet" />}
          </h3>
          <Button
            className="no-internet-button"
            variant="contained"
            color="primary"
            onClick={this.onTryAgain.bind(this)}
          >{<IntlMessages id="chat.tryAgain" />}
          </Button>
        </div>
      )
    }
  }
  showCommunication = () => {
    return (
      <div className="chat-box">
        <div className="chat-box-main">
          {/* {this.props.selectedUser === null && navigator.onLine ? (
            <div
              className="loader-view"
              style={{ "margin-top": isIOS ? "-40px" : "0px" }}
            >
              <i className="zmdi zmdi-comment s-128 text-muted" />

              <Button
                className="d-block d-xl-none"
                color="primary"
                onClick={this.onChatToggleDrawer.bind(this)}
              >
                {<IntlMessages id="chat.selectContactChat" />}
              </Button>
            </div>
          ) : (
              this.Communication()
            )} */}
          {this.renderInit(this.props.selectedUser)}
        </div>
      </div>
    );
  };

  loadSmsLink(nextProps) {
    const { subScribeUSerData } = this.props
    let location = window.location;
    if (nextProps.chatUsers.length > 0 && subScribeUSerData && this.state.scrollFlg) {
      var chatUsers = JSON.parse(JSON.stringify(nextProps.chatUsers));
      if (location && location.pathname.replace('/app/chat/', '') !== '' &&
        location.pathname.replace('/app/chat', '') !== '') {
        var dataFlg = false;
        var returnData;
        var user = chatUsers.find((item) =>
          item.actualContactNo && item.actualContactNo.indexOf(location.pathname.replace("/app/chat/", "")) >= 0);

        if (user === null || user === undefined) {
          user = nextProps.chatUsers.find((item) => item.id ===
            location.pathname.replace('/app/chat/', ''))
        }
        if (user && (document.getElementById('selectedUser').innerText !== null)) {
          this.onSelectUser(user);
        }
        //  if((user == undefined || user ==null) && subScribeUSerData && subScribeUSerData.businessAgents
        //  && subScribeUSerData.businessAgents.length >0){
        //   const config = {
        //     headers: {
        //       'Authorization': "b72cc0c9-c5a1-4aae-a3aa-e34ff7160feb",
        //       "Content-Type":"application/json",
        //       "Access-Control-Allow-Origin": "*",
        //       "mode": "no-cors"
        //     }
        //   }
        //    axios.get(`consumer/v1/contacts/hash?hashCode=${location.pathname.replace('/app/chat/','')}
        //    &businessAgentId=${subScribeUSerData.businessAgents["0"].id}`
        //    , config).then(({data}) => {
        //     let userData = this.constructJson(data,0);
        //     if(userData && document.getElementById('selectedUser').innerText !== userData.name){
        //       this.onSelectUser(userData);
        //     }
        //   }).catch(function (error) {
        //   });
        //  }
      }
    }
  }

  changeStyle() {
    let chatFooter = document.getElementsByClassName(
      "chat-main-footer",
      "chat-main"
    );
    let phoneAnchor = document.getElementById("phone-anchor");
    if (chatFooter && chatFooter[0] instanceof Element && phoneAnchor) {
      if (
        this.props.conversation &&
        this.props.conversation.user &&
        (this.props.conversation.user.contactNo == null ||
          this.props.conversation.user.contactNo == "" ||
          this.props.conversation.user.contactNo == undefined)
      ) {
        chatFooter[0].classList.add("component-none");
        phoneAnchor.classList.add("component-none");
      } else {
        chatFooter[0].classList.remove("component-none");
        phoneAnchor.classList.remove("component-none");
      }
    }
  }

  constructor() {
    super();
    this.state = {
      selectedTabIndex: 0,
      disabled: false,
      scrollFlg: true,
      networkFlag: true,
      resumeFlg: true
    };
    this.scrollComponent = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { subScribeUSerData } = this.props;
    if (this.props.chatUsers != nextProps.chatUsers) {
      this.loadSmsLink(nextProps);
    }
  }

  updateSearchChatUser(evt) {
    this.props.updateSearchChatUser(evt.target.value);
    this.props.filterUsers(evt.target.value);
  }

  onChatToggleDrawer() {
    this.props.onChatToggleDrawer();
  }

  subscribeTopic = (consumerSessionId, pwaSessionId) => {
    const subscriptionName = `${pwaSessionId}-${consumerSessionId}`;
    if (this.props.stompClientRef) {
      this.props.stompClientRef.subscribe(
        `${SocketConfig.subscribeTopicPrefix}/${consumerSessionId}`,
        this.SubscriptionHeaders(
          subscriptionName,
          consumerSessionId,
          pwaSessionId
        )
      );
    }
  };

  SubscriptionHeaders = (topic, sessionId) => {
    return {
      "activemq.retroactive": "true",
      id: `/topic/${topic}`,
      session: sessionId
    };
  };

  MessageBuilder = (sessionId, roomId) => {
    return {
      clientMessageId: uuid(),
      roomId: roomId,
      sessionId: sessionId,
      sender: {
        senderType: "BUSINESS",
        id: sessionId,
        name: localStorage.getItem("name")
      },
      serverTime: moment().unix()
    };
  };

  sendThroughSms = (conversationId, sessionId) => {
    this.subscribeTopic(conversationId, sessionId);
    let message = this.MessageBuilder(sessionId, conversationId);
    message.payload = {
      payloadType: "CONNECT_THROUGH_SMS",
      conversationId: conversationId,
      sessionId: sessionId
    };
    if (this.props.stompClientRef) {
      this.props.stompClientRef.sendMessage(
        SocketConfig.leave,
        JSON.stringify(message)
      );
    } else {
      console.log("SendThrough Sms Failed");
    }
  };

  render() {
    const { loader, userState, drawerState } = this.props;
    return (
      <div className="app-wrapper app-wrapper-module">
        <div className="app-module chat-module animated slideInUpTiny animation-duration-3">
          <div className="chat-module-box">
            <div className="d-block d-xl-none">
              <Drawer
                open={drawerState}
                anchor={"left"}
                onClose={this.onChatToggleDrawer.bind(this)}
              >
                {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
              </Drawer>
            </div>
            <div className="chat-sidenav d-none d-xl-flex">
              {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
            </div>
            {loader ? (
              <div
                className="loader-view w-100"
                style={{ height: "calc(100vh - 120px)" }}
              >
                <CircularProgress />
              </div>
            ) : (
                this.showCommunication()
              )}
          </div>
        </div>
      </div>
    );
  }

  getSourceType = type => {
    let source = "";
    switch (type) {
      case "WEBSITE":
        source = "Agentz Contact Center";
        break;
      case "DIGITAL_SMS":
        source = "Agentz Digital Receptionist - SMS";
        break;
      case "DIGITAL_PHONE":
        source = "Agentz Digital Receptionist - Phone";
        break;
      default:
        source = "Agentz Digital Receptionist";
    }
    return source;
  };
}

const mapStateToProps = ({ chatData, settings, auth }) => {
  const { width } = settings;
  const { subScribeUSerData } = auth;
  const {
    loader,
    userNotFound,
    drawerState,
    selectedSectionId,
    userState,
    searchChatUser,
    contactList,
    selectedUser,
    message,
    chatUsers,
    conversationList,
    conversation,
    stompClientRef,
    updatedLiveSupportRequestList
  } = chatData;

  return {
    width,
    loader,
    userNotFound,
    drawerState,
    selectedSectionId,
    userState,
    searchChatUser,
    contactList,
    selectedUser,
    message,
    chatUsers,
    conversationList,
    conversation,
    subScribeUSerData,
    stompClientRef,
    updatedLiveSupportRequestList
  };
};

export default connect(
  mapStateToProps,
  {
    fetchChatUser,
    fetchChatUserConversation,
    filterContacts,
    filterUsers,
    onSelectUser,
    hideLoader,
    userInfoState,
    submitComment,
    sendSms,
    updateMessageValue,
    updateSearchChatUser,
    onChatToggleDrawer,
    readAlltheChatMessages,
    setInitUrl,
    updateConversation
  }
)(ChatPanelWithRedux);
