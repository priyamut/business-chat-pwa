import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  SUBSCRIBE_USER_DATA,
  SIGNOUT_USER
} from "../constants/ActionTypes";
import axios from 'util/Api'

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({name, email, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/register', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("idToken", JSON.stringify(data.idToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.accessToken});
        dispatch({type: USER_DATA, payload: data.name});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      if(error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};

export const userSignIn = ({email, password}) => {
  const config = {
    headers: {
      'Authorization': "a9d23aa1-e38d-4e42-b3c2-aa9f72eaa252",
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*",
      "mode": "no-cors"
    }
  }
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('iam/v1/login', JSON.stringify({
        userId: email,
        password: password,
      }), config,
    ).then(({data}) => {
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("idToken", JSON.stringify(data.idToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.accessToken});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};


function subScribeUser(dispatch,businessId){
    dispatch({type: FETCH_START});
    axios.get('/business/v1/subscriptions?businessId=' + businessId,{
      headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken")),
      "agentdomain" : JSON.parse(localStorage.getItem('businessMap'))["0"].name
      }}).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SUBSCRIBE_USER_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      if(error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
}

export const getUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('iam/v1/users',{headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken"))}
  }
    ).then(({data}) => {
      if (data) {
        localStorage.setItem("businessId", data.businesses[0].id);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        localStorage.setItem("businessMap", JSON.stringify(data.businesses));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.name});
        subScribeUser(dispatch,data.businesses[0].id);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      if(error.request.status === 401){
        clearStorage();
      }else if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};


export const userSignOut = () => {
  return (dispatch) => {
    dispatch({type: SIGNOUT_USER});
    let idToken = localStorage.getItem("idToken");
    let accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("businessId");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("businessMap");
        dispatch({type: SIGNOUT_USER_SUCCESS});
    axios.post('iam/v1/logout',{}, {headers: {
      "idToken": JSON.parse(idToken),
      "authorization":JSON.parse(accessToken)}
  }
    ).then(({data}) => {
        dispatch({type: FETCH_SUCCESS});
    }).catch(function (error) {
      if(error && error.response && error.response.data && error.response.data.errorMessage){
        dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      }
    });
  }
};

function clearStorage(){
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

