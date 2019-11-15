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
    axios.get(`consumer/v1/contacts?businessAgentMappingId=${businessAgentMappingId}&businessId=' + localStorage.getItem('businessId')`,{headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken"))}
  }).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_ALL_CHAT_USER_SUCCESS, payload: data.contacts});
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


export const onSelectUser = (user) => {
  return {
    type: ON_SELECT_USER,
    payload: user
  };
};

export const submitComment = () => {
  return {
    type: SUBMIT_COMMENT,
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