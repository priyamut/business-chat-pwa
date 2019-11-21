import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Input from '@material-ui/core/Input'
import ChatUserList from 'components/chatPanel/ChatUserList/index';
import Conversation from 'components/chatPanel/Conversation/index';
import ContactList from 'components/chatPanel/ContactList/index';
import SearchBox from 'components/SearchBox';
import IntlMessages from 'util/IntlMessages';
import MenuIcon from '@material-ui/icons/Menu';
import {setInitUrl} from './../../../../actions/Auth';
import {Scrollbars} from 'react-custom-scrollbars';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

import {
  fetchChatUser,
  fetchChatUserConversation,
  filterContacts,
  filterUsers,
  hideLoader,
  onChatToggleDrawer,
  onSelectUser,
  submitComment,
  updateMessageValue,
  updateSearchChatUser,
  userInfoState,
  readAlltheChatMessages,
  updateConversation
} from 'actions/Chat'
import CustomScrollbars from 'util/CustomScrollbars';
import { isIOS } from 'react-device-detect';

class ChatPanelWithRedux extends PureComponent {
  filterContacts = (userName) => {
    this.props.filterContacts(userName);
  };
  filterUsers = (userName) => {
    this.props.filterUsers(userName);
  };
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };

  onSelectUser = (user) => {
    const {subScribeUSerData} = this.props;
    this.props.updateMessageValue('');
    this.setState({
      scrollFlg: true
    });
    this.props.onSelectUser(user,subScribeUSerData.businessAgents["0"].id, this.props.hideLoader, this.scrollToBottom);
    this.changeContactDetails(user);
    this.props.fetchChatUser(subScribeUSerData.businessAgents["0"].id);
  };

  changeContactDetails(user){
    this.ChangeUrl('/app/chat/'+user['contactHashCode']);
    if(document.getElementById('selectedUser')){
      var div = document.getElementById('selectedUser');
        div.innerHTML = user.name || user.emailId || user.contactNo;
    }
    if(document.getElementById('selectedContactNo')){
      var div = document.getElementById('selectedContactNo');
      div.innerHTML =  user.name ? user.contactNo ? user.contactNo : '' : '';
    }
    if(document.getElementById('phone')){
      var anchor = document.getElementById('phone-anchor');
      anchor.href = `tel:${user.contactNo}`;
      document.getElementById("phone").style.display = "block";
    }
    if(user.unreadMessage > 0){
      this.props.readAlltheChatMessages(user.id);
    }   
  }

   ChangeUrl(url) {
    if (typeof (window.history.pushState) != "undefined") {
        var obj = { Page: 'page', Url: url };
        window.history.pushState(obj, obj.Page, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
  }

  submitComment = () => {
    if (this.props.message !== '' && !this.state.disabled) {
        this.props.submitComment(this.props, this.scrollToBottom);
    }
  };

  handleCommentChange = (event)=>{
    event.preventDefault();
    const content = event.target.value;
    //let errors = this.state.disabled;
    if(content.length <= 200){
     // this.setState({disabled: true});
     this.updateMessageValue(event);
    }
  }

  scrollToBottom = () =>{ 
    var scroll = document.getElementsByClassName('chat-list-scroll', 'chat-box-main');
    if(scroll && scroll[0] instanceof Element){
      scroll = scroll[0].children[0];
      scroll.scrollTop = scroll.scrollHeight;
    }
  }
  updateMessageValue = (evt) => {
    this.props.updateMessageValue(evt.target.value);
  };

  scrollComponentTobottom = () =>{
    if(this.state.scrollFlg){
      this.scrollComponent.scrollToBottom();
      this.setState({
        scrollFlg: false
      });
      this.changeStyle();
    }
  }

  Communication = () => {
    if(!this.props.conversation || this.props.conversation.length == 0){
      return;
    }
    const {message, conversation} = this.props;
    const {Sms} = conversation;
    let selectedUser = conversation.user;
    
    return <div className="chat-main">
      <Scrollbars className="chat-list-scroll scrollbar"
                        style={{height: 'calc(100vh - 222px)'}} onUpdate={this.scrollComponentTobottom} ref={c => { this.scrollComponent = c }}>
            { Sms.length == 0 ?
            <div className="loader-view" style={{"margin-top" : isIOS ? '-40px' : '0px',
            display: 'flex', flexDirection: 'column', flexWrap:'nowrap',
            justifyContent:'center',height:'100%'}}>
              {/* <i className="zmdi zmdi-comments s-128 text-muted"/> */}
              
            {(selectedUser.contactNo !== null && selectedUser.contactNo !== undefined
            && selectedUser.contactNo !== "")
             ? 
            (<React.Fragment><AnnouncementIcon className="s-128 text-muted"/>
            <h3 className="text-muted">
            <IntlMessages id="chat.noMessageToShow"/>
            </h3>
            </React.Fragment>)
            : (<React.Fragment>
              <SpeakerNotesOffIcon className="s-128 text-muted"/>
            <h3 className="text-muted">
            <IntlMessages id="chat.noContactNoForthisUser"/>
            </h3></React.Fragment>)}
            </div>
            : <Conversation conversationData={Sms}
            selectedUser={selectedUser}  />}

        
      </Scrollbars>

      <div className="chat-main-footer">
        <div className="d-flex flex-row align-items-center" style={{maxHeight: 51}}>
          <div className="col">
            <div className="form-group">
                            <textarea
                              id="required" className="border-0 form-control chat-textarea"
                              onKeyUp={this._handleKeyPress.bind(this)}
                              //onChange={this.updateMessageValue.bind(this)}
                              onChange={this.handleCommentChange.bind(this)} noValidate
                              value={message}
                              autocorrect="off"
                              placeholder="Type and hit enter to send message"
                            />
            </div>
          </div>
          <div className="chat-sent">
            <IconButton disabled={this.state.disabled}
              onClick={this.submitComment.bind(this)}
              aria-label="Send message">
              <i className="zmdi  zmdi-mail-send"/>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  };

  AppUsersInfo = () => {
    return <div className="chat-sidenav-main">
      <div className="bg-grey lighten-5 chat-sidenav-header">

        <div className="chat-user-hd mb-0">
          <IconButton className="back-to-chats-button" aria-label="back button"
                      onClick={() => {
                        this.setState({
                          userState: 1
                        });
                      }}>
            <i className="zmdi zmdi-arrow-back"/>
          </IconButton>
        </div>
        <div className="chat-user chat-user-center">
          <div className="chat-avatar mx-auto">
            <img src='https://via.placeholder.com/150x150'
                 className="avatar avatar-shadow rounded-circle size-60 huge" alt="John Doe"/>
          </div>

          <div className="user-name h4 my-2 text-white">Robert Johnson</div>

        </div>
      </div>
      <div className="cyan chat-sidenav-content">

        <CustomScrollbars className="chat-sidenav-scroll scrollbar"
                          style={{height: this.props.width >= 1200 ? 'calc(100vh - 328px)' : 'calc(100vh - 162px)'}}>
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
                margin="none"/>

            </div>
          </form>
        </CustomScrollbars>

      </div>
    </div>
  };
  ChatUsers = () => {
    return <div className="chat-sidenav-main">
      <div className="chat-sidenav-header">

        <div className="chat-user-hd">

          <div className="module-user-info d-flex flex-column justify-content-center">
            <div className="module-title">
              <h2 className="mb-0" style={{color : '#fff',fontWeight : '500',overflow: 'hidden',
          whiteSpace: 'nowrap', textOverflow: 'ellipsis',    textTransform: "uppercase"
        }}>{localStorage.getItem('name')}</h2>
            </div>

          </div>
        </div>

        <div className="search-wrapper">

          <SearchBox placeholder="Search or start new chat"
                     onChange={this.updateSearchChatUser.bind(this)}
                     value={this.props.searchChatUser}/>

        </div>
      </div>

      <div className="chat-sidenav-content">
        <AppBar position="static" className="no-shadow chat-tabs-header">
          <Tabs
            className="chat-tabs"
            value={this.state.selectedTabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={<IntlMessages id="chat.contacts"/>}/>
            {/* <Tab label={<IntlMessages id="chat.contacts"/>}/> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.selectedTabIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <CustomScrollbars className="chat-sidenav-scroll scrollbar"
                            style={{height: this.props.width >= 1200 ? 'calc(100vh - 328px)' : 'calc(100vh - 146px)'}}>
            {this.props.chatUsers.length === 0 ?
              <div className="p-5">{this.props.userNotFound}</div>
              :
              <ChatUserList chatUsers={this.props.chatUsers}
                            selectedSectionId={this.props.selectedSectionId}
                            onSelectUser={this.onSelectUser.bind(this)} />
            }
          </CustomScrollbars>

        </SwipeableViews>

      </div>
    </div>
  };
  handleChange = (event, value) => {
    this.setState({selectedTabIndex: value});
  };

  handleChangeIndex = index => {
    this.setState({selectedTabIndex: index});
  };
  showCommunication = () => {
    return (
      <div className="chat-box">
        <div className="chat-box-main">{
          this.props.selectedUser === null ?
            <div className="loader-view" style={{"margin-top" : isIOS ? '-40px' : '0px'}}>
              <i className="zmdi zmdi-comment s-128 text-muted"/>
              
              <Button className="d-block d-xl-none" color="primary"
                      onClick={this.onChatToggleDrawer.bind(this)}>{<IntlMessages
                id="chat.selectContactChat"/>}</Button>
            </div>
            : this.Communication()}
        </div>
      </div>)
  };

  loadSmsLink(nextProps){
    const {subScribeUSerData, location} = this.props
    if(nextProps.chatUsers.length >0 && subScribeUSerData){
       if(location && location.pathname.replace('/app/chat/','') !== '' &&
          location.pathname.replace('/app/chat','') !== ''){
           const user = nextProps.chatUsers.find((item) => item.contactHashCode === 
           location.pathname.replace('/app/chat/',''))
           if(user && document.getElementById('selectedUser').innerText !== user.name){
             this.onSelectUser(user); 
           }
    }
  }
  }

  changeStyle(){
    let chatFooter = document.getElementsByClassName('chat-main-footer','chat-main');
    let phoneAnchor = document.getElementById('phone-anchor');
    if(chatFooter && chatFooter[0] instanceof Element && phoneAnchor){
      if(this.props.conversation && this.props.conversation.user && 
        (this.props.conversation.user.contactNo == null || this.props.conversation.user.contactNo == ''
        || this.props.conversation.user.contactNo == undefined)){
        chatFooter[0].classList.add('component-none');
        phoneAnchor.classList.add('component-none');
      }else{
        chatFooter[0].classList.remove('component-none');
         phoneAnchor.classList.remove('component-none');
      }
    }
  }

  constructor() {
    super();
    this.state = {
      selectedTabIndex: 0,
      disabled: false,
      scrollFlg :true
    }
    this.scrollComponent = React.createRef();
  }

  

  componentWillReceiveProps(nextProps){
   if(this.props.chatUsers != nextProps.chatUsers){
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

  
  render() {
    const {loader, userState, drawerState} = this.props;
    return (
      <div className="app-wrapper app-wrapper-module">
        <div className="app-module chat-module animated slideInUpTiny animation-duration-3">
          <div className="chat-module-box">
            <div className="d-block d-xl-none">
              <Drawer open={drawerState} anchor={"left"}
                      onClose={this.onChatToggleDrawer.bind(this)}>
                {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
              </Drawer>
            </div>
            <div className="chat-sidenav d-none d-xl-flex">
              {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
            </div>
            {loader ?
              <div className="loader-view w-100"
                   style={{height: 'calc(100vh - 120px)'}}>
                <CircularProgress/>
              </div> : this.showCommunication()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({chatData, settings,auth}) => {
  const {width} = settings;
  const {subScribeUSerData} = auth;
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
    conversation
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
    subScribeUSerData
  }
};

export default connect(mapStateToProps, {
  fetchChatUser,
  fetchChatUserConversation,
  filterContacts,
  filterUsers,
  onSelectUser,
  hideLoader,
  userInfoState,
  submitComment,
  updateMessageValue,
  updateSearchChatUser,
  onChatToggleDrawer,
  readAlltheChatMessages,setInitUrl,
  updateConversation
})(ChatPanelWithRedux);