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
  FETCH_START,
  ON_READ_ALL_MESSAGE,
  UPDATE_SEARCH_CONVERSTAION,
  STOMP_CLIENT_FUNCTION,
  UPDATE_LIVE_SUPPORT
} from 'constants/ActionTypes';
import axios from 'util/Api';

export const fetchChatUser = (businessAgentMappingId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_CHAT_USER });
    axios.get(`consumer/v1/contacts?businessAgentMappingId=${businessAgentMappingId}&businessId=` + localStorage.getItem('businessId'), {
      headers: {
        "idToken": JSON.parse(localStorage.getItem("idToken")),
        "authorization": JSON.parse(localStorage.getItem("accessToken"))
      }
    }).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_ALL_CHAT_USER_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      if(error.request && error.request.status === 401){
        clearStorage();
      }
      if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};

export const onSelectUser = (user, businessAgentMappingId, hideLoader) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get(`consumer/v1/${user.id}/sms?businessId=${businessAgentMappingId}`, {
      headers: {
        "idToken": JSON.parse(localStorage.getItem("idToken")),
        "authorization": JSON.parse(localStorage.getItem("accessToken")),
        "agentDomain": JSON.parse(localStorage.getItem("businessMap"))[0].name
      }
    }).then(({ data }) => {
      if (data) {
        data.user = user;
        data.Sms = data.Sms.reverse();
        dispatch({ type: ON_SELECT_USER, payload: data });
        hideLoader();
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      if(error.request && error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};


export const submitComment = (paramData) => {
  return (dispatch) => {
    dispatch({ type: SUBMIT_COMMENT });
    axios.post(`consumer/v1/sendsms`, paramData, {
      headers: {
        "idToken": JSON.parse(localStorage.getItem("idToken")),
        "authorization": JSON.parse(localStorage.getItem("accessToken"))
      }
    }).then(({ data }) => {
      if (data == "") {
        hideLoader();
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      if(error.request &&  error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};
export const sendSms = (paramData,props) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post(`consumer/v1/sendsms`, paramData, {
      headers: {
        "idToken": JSON.parse(localStorage.getItem("idToken")),
        "authorization": JSON.parse(localStorage.getItem("accessToken"))
      }
    }).then(({ data }) => {
      if(props.updateConversation){
        let currentMessage = props.conversation.Sms.find((item) => item.uniqueId === paramData.conversationId);
        if(currentMessage){
          currentMessage.type = undefined;
          props.updateConversation(JSON.parse(JSON.stringify(props.conversation)));
        }   
      }
    }).catch(function (error) {
      if(error.request && error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
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


export const stompClientSendMessage = (clientRef) => {
  return {
    type: STOMP_CLIENT_FUNCTION,
    payload: clientRef
  };
};


export const updateConversation = (updatedConversationList) => {
  return {
    type: UPDATE_SEARCH_CONVERSTAION,
    payload: updatedConversationList
  };
};


export const updateLiveSupportRequest = (updatedLiveSupportRequestList) => {
  return {
    type: UPDATE_LIVE_SUPPORT,
    payload: updatedLiveSupportRequestList
  };
};

export const onChatToggleDrawer = () => {
  return {
    type: ON_TOGGLE_DRAWER
  };
};

export const readAlltheChatMessages = (contactMasterId) => {
  if(JSON.parse(localStorage.getItem("businessMap"))!== null && 
  JSON.parse(localStorage.getItem("businessMap")).length > 0){
    const config = {
      headers: {
        "idToken": JSON.parse(localStorage.getItem("idToken")),
        "authorization": JSON.parse(localStorage.getItem("accessToken")),
        "agentDomain": JSON.parse(localStorage.getItem("businessMap"))[0].name
      }
    }
    return (dispatch) => {
      dispatch({ type: ON_READ_ALL_MESSAGE });
      axios.put(`notification/v1/businesses/${localStorage.getItem('businessId')}/notificationcenter/${contactMasterId}/readAll`, {}, config).then(({ data }) => {
  
      }).catch(function (error) {
        if(error.request && error.request.status === 401){
          clearStorage();
        }else if(error && error.response && error.response.data && error.response.data.errorMessage){
          dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
        }
      });
    }
  }
};

export function clearStorage(){
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("idToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("businessId");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("businessMap");
        window.location.reload(); // refresh the page
}