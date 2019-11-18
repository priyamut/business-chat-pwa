import {
  FETCH_ALL_CHAT_USER,
  FETCH_ALL_CHAT_USER_CONVERSATION,
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
  USER_INFO_STATE,
  FETCH_ERROR,
  FETCH_ALL_CHAT_USER_UNREAD_COUNT,
  FETCH_START
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const fetchChatUser = (businessAgentMappingId) => {
  return (dispatch) => {
    dispatch({type: FETCH_ALL_CHAT_USER});
    axios.get(`consumer/v1/contacts?businessAgentMappingId=${businessAgentMappingId}&businessId=` + localStorage.getItem('businessId'),{headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken"))}
  }).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_ALL_CHAT_USER_SUCCESS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", {error});
    });
  }
};

export const onSelectUser = (user, businessAgentMappingId, hideLoader,scrollToBottom) => {
  return (dispatch) => {
    dispatch({type: ON_SELECT_USER});
    axios.get(`consumer/v1/${user.id}/sms?businessId=${businessAgentMappingId}`,{headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken")),
      "agentDomain": JSON.parse(localStorage.getItem("businessMap"))[0].name}
  }).then(({data}) => {
      if (data) {
        data.user = user;
        data.Sms = data.Sms.reverse();
        dispatch({type: ON_SELECT_USER, payload: data});
        hideLoader();
        scrollToBottom();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", {error});
    });
  }
};


export const submitComment = (subScribeUSerData,scrollToBottom) => {
  const paramData = {businessId: localStorage.getItem('businessId'),
    contactMasterId: subScribeUSerData.conversation.user.id,
    message: subScribeUSerData.message,
   toNumber: subScribeUSerData.conversation.user.contactNo
    };
  return (dispatch) => {
    dispatch({type: SUBMIT_COMMENT});
    axios.post(`consumer/v1/sendsms`,paramData,{headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken"))}
  }).then(({data}) => {
      if (data == "") {
        // dispatch({type: SUBMIT_COMMENT, payload: data});
        hideLoader();
        scrollToBottom();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", {error});
    });
  }
};

export const fetchChatUserConversation = () => {
  return {
    type: FETCH_ALL_CHAT_USER_CONVERSATION
  };
};


export const fetchChatUserConversationSuccess = (mails) => {
  return {
    type: FETCH_ALL_CHAT_USER_CONVERSATION_SUCCESS,
    payload: mails
  }
};

export const showChatMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const filterContacts = (userName) => {
  return {
    type: FILTER_CONTACT,
    payload: userName
  };
};

export const filterUsers = (userName) => {
  return {
    type: FILTER_USERS,
    payload: userName
  };
};



export const hideLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};

export const userInfoState = (state) => {
  return {
    type: USER_INFO_STATE,
    payload: state
  };
};

export const updateMessageValue = (message) => {
  return {
    type: UPDATE_MESSAGE_VALUE,
    payload: message
  };
};


export const updateSearchChatUser = (userName) => {
  return {
    type: UPDATE_SEARCH_CHAT_USER,
    payload: userName
  };
};
export const onChatToggleDrawer = () => {
  return {
    type: ON_TOGGLE_DRAWER
  };
};