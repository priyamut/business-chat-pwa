import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import "assets/vendors/style"
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from 'app/index';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import AddToHomescreen from 'react-add-to-homescreen';

class App extends Component {

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  handleAddToHomescreen = () => {
    console.log("here")
    alert('1. Open Share menu\n2. Tap on "Add to Home Screen" button');
  };

  render() {
    const {match, location, locale, isDirectionRTL} = this.props;
    if (location.pathname === '/') {
      return ( <Redirect to={'/app/chat'}/> );
    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">
                <Switch>
                  <Route path={`${match.url}app`} component={MainApp}/>
                  <Route
                    component={asyncComponent(() => import('components/Error404'))}/>
                </Switch>
              </div>
              <AddToHomescreen
          onAddToHomescreenClick={this.handleAddToHomescreen}
        />
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {sideNavColor, locale, isDirectionRTL} = settings;
  return {sideNavColor, locale, isDirectionRTL}
};

export default connect(mapStateToProps)(App);

