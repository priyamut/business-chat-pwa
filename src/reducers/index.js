import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import ChatData from './Chat';
import Auth from './Auth';
import Common from './Common';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  chatData: ChatData,
  auth: Auth,
  commonData: Common,
});
