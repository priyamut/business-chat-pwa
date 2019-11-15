import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { App, Home, NotFound } from 'containers';
import Login from 'containers/SignIn';
import Singup from 'containers/SignUp';

const isAuthenticated = connectedReduxRedirect({
  redirectPath: `/login`,
  authenticatedSelector: state => state.auth.user !== null,
  // redirectAction: routerActions.replace,
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.auth.user === null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
});

const isOkayNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => true,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
 });

const routes = [
  {
    component: App,
    routes: [
      { path: '/',  component:isNotAuthenticated(Login)},
      { path: '/signin', component:isNotAuthenticated(Login)},

      // business Pages
      // { path: '/business/login', component: isNotAuthenticated(Login) },
      { path: '/signup', component: isNotAuthenticated(Singup) },
      // 404 page
      { component: NotFound }
    ]
  }
];

export default routes;
