import axios from 'axios';
import config from 'config';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import Alert from 'react-s-alert';
import { ApiBasePath, CalendarCredential } from 'config/AppConfig';

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: __SERVER__ ? config.apiUrl : '/api'
  });

  let token;
  instance.setJwtToken = newToken => {
    token = newToken;
  };

  let idToken;
  instance.setAgentzIdTokens = newIdToken => {
    idToken = newIdToken;
  };

  let refreshToken;
  instance.setRefreshToken = newRefreshToken => {
    refreshToken = newRefreshToken;
  };

  let expireTime;
  instance.tokenExpireTime = newExpireTime => {
    expireTime = newExpireTime;
  };

  let workspace;
  instance.setAgentzWorkspace = newWorkspace => {
    workspace = newWorkspace;
  };

  instance.interceptors.request.use(
    async conf => {
      if (conf.url.startsWith(CalendarCredential.GOOGLE.path)) {
        conf.url = `${window.location.origin}${conf.url}`;
        conf.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return conf;
      }
      if (conf.url.startsWith('/kb/')) {
        conf.headers.authorization = config.krrServiceToken;
        return conf;
      }
      // if(conf.url.endsWith('/domains/publishedagents')){ //||conf.url.endsWith('/demotrial')){
      //   conf.headers.authorization = "13c57fd4-5d93-4cdf-8f4d-20d035bb8ee3";//config.serviceToken;
      //   return conf;
      // }
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie');
        }
        if (req.header('authorization')) {
          conf.headers.authorization = req.header('authorization');
        }
        if (req.header('idToken')) {
          conf.headers.idToken = req.header('idToken');
        }
        if (req.header('workspace')) {
          conf.headers.AgentDomain = req.header('workspace');
        }
      }
      if (token) {
        if (moment() > expireTime) {
          const result = await axios.post(`/api${ApiBasePath.IAM_API}/newaccesstoken`, { refreshToken });
          if (result.data && result.data.accessToken) {
            token = result.data.accessToken;
            const decodeToken = jwtDecode(token);
            expireTime = moment(decodeToken.exp * 1000).subtract(config.refreshBeforeInMins, 'minutes');
            document.cookie = `expireTime=${expireTime};path=/`;
          } else {
            token = '';
          }
          document.cookie = `accessToken=${token};path=/`;
        }
        conf.headers.authorization = token;
      }
      // Agentz Tokens
      if (idToken) {
        conf.headers.idToken = idToken;
      }
      if (workspace) {
        conf.headers.AgentDomain = workspace;
      }
      return conf;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => {
      let skipStatusValidation = false;
      if (!navigator.onLine) {
        Alert.error('<b>Internet connection lost. Try after some time.</b>', { timeout: 'none' });
        skipStatusValidation = true;
      }
      if (error.response) {
        console.error('API - Backend error ', error.response);
      }
      if (error.response && error.response.status && !skipStatusValidation) {
        if (error.response.status === 500) {
          Alert.error('<b>Internal server error. Try after some time.</b>', { timeout: 'none', stack: { limit: 1 } });
        } else if (error.response.status >= 501 && error.response.status <= 511) {
          Alert.error('<b>Connection lost to backend servers. Try after some time.</b>', {
            timeout: 'none',
            stack: { limit: 1 }
          });
        } else if (error.response.status === 401) {
          /* if (error.config.url && error.config.url.includes(`${ApiBasePath.IAM_API}/login`)) {
            console.log('Login failed');
          } else {
            Alert.error('Your session has been expired!', { timeout: 'none', stack: { limit: 1 } });
          } */
          //  Alert.error('Your session has been expired!', { timeout: 'none', stack: { limit: 1 } });
        }
      }
      return Promise.reject(error.response ? error.response.data : error);
    }
  );

  return instance;
}
