import Moment from 'moment';
import users from 'app/routes/chatPanel/data/chatUsers';
import conversationList from 'app/routes/chatPanel/data/conversationList';
import {
  FETCH_ALL_CHAT_USER_CONVERSATION_SUCCESS,
  FETCH_ALL_CHAT_USER_SUCCESS,
  FILTER_CONTACT,
  FILTER_USERS,
  ON_HIDE_LOADER,
  ON_SELECT_USER,
  ON_TOGGLE_DRAWER,
  SHOW_MESSAGE,
  SUBMIT_COMMENT,
  UPDATE_MESSAGE_VALUE,
  UPDATE_SEARCH_CHAT_USER,
  FETCH_ALL_CHAT_USER,
  FETCH_ALL_CHAT_USER_UNREAD_COUNT
} from 'constants/ActionTypes';
import {USER_INFO_STATE} from '../constants/ActionTypes';


const INIT_STATE = {
  loader: false,
  userNotFound: 'No user found',
  drawerState: false,
  selectedSectionId: '',
  userState: 1,
  searchChatUser: '',
  contactList: [],
  selectedUser: null,
  message: '',
  chatUsers: [],
  conversationList: conversationList,
  conversation: null,
  chatUnreadCount  : {}
};


function constructJson (contactInfo,chatUnreadCount) {
  let tempJSON = {};
  if (contactInfo.createdDate !== undefined) {
    tempJSON.createdDate = contactInfo.createdDate;
  }
  if (contactInfo.source !== undefined) {
    tempJSON.source = getSourceType(contactInfo.source)
  }
  tempJSON.id = contactInfo.id;
  tempJSON.conversationId = contactInfo.conversationId;
  tempJSON.businessAgentMappingId = contactInfo.businessAgentMappingId;
  tempJSON.recentActivityDate = contactInfo.recentActivityDate;
  tempJSON.unreadMessage = chatUnreadCount[contactInfo.id] ? chatUnreadCount[contactInfo.id] : 0;

  {
    contactInfo && contactInfo.contactData.map((profileDetails, i) => {
      if (profileDetails.name === 'contactNo') {
        if (profileDetails.value.length > 1) {
          let tempContactNo = '';
          profileDetails.value.forEach(function (item, index) {
            if (index === 0) {
              tempContactNo = item;
            } else {
              tempContactNo += `, ${item}`;
            }
          })
          tempJSON[`${profileDetails.name}`] = tempContactNo;
        } else {
          tempJSON[`${profileDetails.name}`] = profileDetails.value[0];
        }
      } else if (profileDetails.name === 'emailId') {
        if (profileDetails.value.length > 1) {
          let tempEmailId = '';
          profileDetails.value.forEach(function (item, index) {
            if (index === 0) {
              tempEmailId = item;
            } else {
              tempEmailId += `, ${item}`;
            }
          })
          tempJSON[`${profileDetails.name}`] = tempEmailId;
        } else {
          tempJSON[`${profileDetails.name}`] = profileDetails.value[0];
        }
      } else {
        tempJSON[`${profileDetails.name}`] = profileDetails.value[0];
        if (profileDetails.name === 'name' && profileDetails.value.length > 1) {
          let otherName = null;
          tempJSON.otherName = profileDetails.value.forEach(function (item, index) {
            if (index !== 0) {
              if (otherName != null) {
                otherName += `, ${item}`;
              } else {
                otherName = item;
              }
            }
          });
          tempJSON.otherName = otherName;
        }
      }

    })
  };
  return tempJSON;
}


function getSourceType(type){
  let source = '';
  switch(type) {
    case 'WEBSITE':
        source = 'Agentz Contact Center'
      break;
    case 'DIGITAL_SMS':
        source = 'Agentz Digital Receptionist - SMS'
      break;
    case 'DIGITAL_PHONE':
        source = 'Agentz Digital Receptionist - Phone'
      break;
    default:
        source = 'Agentz Digital Receptionist'
  }
  return source;
}



export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case FILTER_CONTACT: {
      if (action.payload === '') {
        return {
          ...state, contactList: users.filter(user => !user.recent)
        }
      } else {
        return {
          ...state, contactList: users.filter((user) =>
             user.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
          )
        }
      }
    }

    case FILTER_USERS: {
      if (action.payload === '') {
        return {
          ...state, chatUsers: state.contactList
        }
      } else {
        return {
          ...state, chatUsers: state.chatUsers.filter((user) =>
          (user.name || user.emailId || user.contactNo).toLowerCase().indexOf(action.payload.toLowerCase()) > -1
          )
        }
      }
    }

    case ON_SELECT_USER: {
      return {
        ...state,
        loader: true,
        drawerState: false,
        selectedSectionId: 1,
        selectedUser: '',
        conversation: action.payload
      }
    }
    case ON_TOGGLE_DRAWER: {
      return {...state, drawerState: !state.drawerState}
    }
    case ON_HIDE_LOADER: {
      return {...state, loader: false}
    }
    case USER_INFO_STATE: {
      return {...state, userState: action.payload}
    }

    case SUBMIT_COMMENT: {
      const updatedConversation = state.conversation.conversationData.concat({
        'messageType': "OUTGOING_SMS",
        'message': state.message,
        'time': Moment().format('hh:mm:ss A'),
      });

      return {
        ...state,
        conversation: {
          ...state.conversation, conversationData: updatedConversation
        },
        message: '',
        conversationList: state.conversationList.map(conversationData => {
          if (conversationData.id === state.conversation.id) {
            return {...state.conversation, conversationData: updatedConversation};
          } else {
            return conversationData;
          }
        })

      }
    }
    case FETCH_ALL_CHAT_USER : {
      return {
        ...state,
        loader: true
      }
    }

    case UPDATE_MESSAGE_VALUE: {
      return {...state, message: action.payload}
    }

    case UPDATE_SEARCH_CHAT_USER: {
      return {...state, searchChatUser: action.payload}
    }

    case FETCH_ALL_CHAT_USER_SUCCESS: {
      let userData = action.payload;
      let newUserData =[];
      if(userData.contacts.length > 0){
        newUserData = userData.contacts.map(element => constructJson(element,userData.unreadCount)).sort(function (a, b) {
          return new Date(b.recentActivityDate) - new Date(a.recentActivityDate);
        });
      }
      return {
        ...state,
        contactList: newUserData,
        chatUsers: newUserData,
        chatUnreadCount:userData.unreadCount,
        loader: false,
      }
    }
    case FETCH_ALL_CHAT_USER_CONVERSATION_SUCCESS: {
      return {
        ...state,
        conversationList: conversationList
      }
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    default:
      return state;
  }
}
