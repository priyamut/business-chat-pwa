import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import Chat from './Chat';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  chatData:Chat
});
