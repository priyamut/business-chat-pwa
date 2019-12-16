import Moment from 'moment';
import users from 'app/routes/chatPanel/data/chatUsers';
import conversationList from 'app/routes/chatPanel/data/conversationList';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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
  ON_READ_ALL_MESSAGE,
  UPDATE_SEARCH_CONVERSTAION
} from 'constants/ActionTypes';
import {USER_INFO_STATE} from '../constants/ActionTypes';
import {createFilter} from 'utils/utils.js';

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
  conversationList: [],
  conversation: [],
  chatUnreadCount  : {},
  sendMessageCounter:0
};
function formatPhoneNumber(inputStr){
  //Filter only numbers from the input
  let returnString = inputStr;
  if(!inputStr.startsWith('+') && inputStr.length > 10){
    inputStr = '+' + inputStr;
  }
  let returnStr = parsePhoneNumberFromString(inputStr);
  let phoneNumberString = inputStr;
  let areaCode = null;
  if(returnStr){
   areaCode = returnStr.countryCallingCode ? returnStr.countryCallingCode : null ;
    phoneNumberString = returnStr.nationalNumber;
  }else{
    areaCode = '1';
  }
   var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
   var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
   if (match) {
    returnString = '';
    if(areaCode){
      returnString = '+' + areaCode;
    }
     returnString =  returnString + ' (' + match[1] + ') ' + match[2] + '-' + match[3];
   }
  
   return returnString;
}

function constructJson (contactInfo,chatUnreadCount) {
  let tempJSON = {};
  if (contactInfo.createdDate !== undefined) {
    tempJSON.createdDate = contactInfo.createdDate;
  }
  if (contactInfo.source !== undefined) {
    tempJSON.source = getSourceType(contactInfo.source)
  }
  tempJSON.id = contactInfo.id;
  tempJSON.contactHashCode = contactInfo.contactHashCode;
  tempJSON.conversationId = contactInfo.conversationId;
  tempJSON.businessAgentMappingId = contactInfo.businessAgentMappingId;
  tempJSON.recentActivityDate = contactInfo.recentActivityDate;
  tempJSON.unreadMessage = chatUnreadCount[contactInfo.id] ? chatUnreadCount[contactInfo.id] : 0;

  {
    contactInfo && contactInfo.contactData.map((profileDetails, i) => {
      if (profileDetails.name === 'contactNo') {
        let contactList = '';
        if (profileDetails.value.length > 1) {
          let tempContactNo = ''; 
          profileDetails.value.forEach(function (item, index) {
            if (index === 0) {
              tempContactNo = item;
              contactList = item;
            }
             else {
              contactList += `, ${item}`;
            }
          })
          tempJSON[`${profileDetails.name}`] = formatPhoneNumber(tempContactNo);
          tempJSON[`actualContactNo`] = contactList;
        } else {
          tempJSON[`${profileDetails.name}`] = formatPhoneNumber(profileDetails.value[0]);
          tempJSON[`actualContactNo`] = profileDetails.value[0];
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
          ...state, chatUsers: state.chatUsers.filter(createFilter(action.payload, ["name","emailId",'contactNo']))
        }
      }
    }

    case ON_SELECT_USER: {
      return {
        ...state,
        loader: true,
        drawerState: false,
        selectedSectionId: action.payload && action.payload.user ? action.payload.user.id : '', 
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

      var updatedConversation  =  state.conversation.Sms;
      
      if(!navigator.onLine) {
        updatedConversation = state.conversation.Sms.concat({
          'messageType': "OUTGOING_SMS",
          'outGoingSms': {
            'message': state.message,
            'smsReceipients': [{'toNum': "+15107562524"}]
          },
          'time': Moment().format('YYYY-MM-DDTHH:mm:ss'),
           ...(!navigator.onLine && {"type" : true}),
           'uniqueId':Math.random().toString(36).substring(7)
        });
      }
      return {
        ...state,
        conversation: {
          ...state.conversation, Sms: updatedConversation
        },
        message: '',
        loader: false,
        conversationList: state.conversationList.map(Sms => {
          if (Sms.id === state.conversation.id) {
            return {...state.conversation, Sms: updatedConversation};
          } else {
            return Sms;
          }
        }),
        sendMessageCounter: state.sendMessageCounter ++ 

      }
    }
    case FETCH_ALL_CHAT_USER : {
      return {
        ...state,
        loader: false
      }
    }
    case ON_READ_ALL_MESSAGE : {
      return {
        ...state,
        loader: false
      }
    }

    case UPDATE_SEARCH_CONVERSTAION : {
      return {
        ...state,
        loader: false,
        conversation:action.payload
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
        newUserData = userData.contacts.map(element => constructJson(element,userData.unreadCount)).sort(function(a, b) {
          return (b.recentActivityDate < a.recentActivityDate) ? -1 : ((b.recentActivityDate > a.recentActivityDate) ? 1 : 0);
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
export {
  constructJson
}