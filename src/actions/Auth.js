import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  SUBSCRIBE_USER_DATA,
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
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const userSignIn = ({email, password}) => {
  const config = {
    headers: {
      'Authorization': "b72cc0c9-c5a1-4aae-a3aa-e34ff7160feb",
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
      console.log("userSignIn: ", data);
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
      dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      console.log("Error****:", error.message);
    });
  }
};


function subScribeUser(dispatch,businessId){
  console.log(JSON.parse(localStorage.getItem('businessMap'))["0"].name)
    dispatch({type: FETCH_START});
    axios.get('/business/v1/subscriptions?businessId=' + businessId,{
      headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken")),
      "agentdomain" : JSON.parse(localStorage.getItem('businessMap'))["0"].name
      }}).then(({data}) => {
      if (data) {
          console.log({data})
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SUBSCRIBE_USER_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      console.log("Error****:", error.message);
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
      console.log("userSignIn: ", data);
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
      dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      console.log("Error****:", error.message);
    });
  }
};


export const userSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('iam/v1/logout',{}, {headers: {
      "idToken": JSON.parse(localStorage.getItem("idToken")),
      "authorization":JSON.parse(localStorage.getItem("accessToken"))}
  }
    ).then(({data}) => {
        dispatch({type: FETCH_SUCCESS});
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("idToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("businessId");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("businessMap");
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNOUT_USER_SUCCESS});
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.errorMessage});
      console.log("Error****:", error.message);
    });
  }
};