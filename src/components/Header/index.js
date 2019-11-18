import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
    INSIDE_THE_HEADER
} from 'constants/ActionTypes';
import SearchBox from 'components/SearchBox';
import MailNotification from '../MailNotification/index';
import AppNotification from '../AppNotification/index';
import CardHeader from 'components/dashboard/Common/CardHeader/index';
import {switchLanguage, toggleCollapsedNav} from 'actions/Setting';
import IntlMessages from 'util/IntlMessages';
import LanguageSwitcher from 'components/LanguageSwitcher/index';
import Menu from 'components/TopNav/Menu';
import UserInfoPopup from 'components/UserInfo/UserInfoPopup';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {userSignOut} from 'actions/Auth';
import SweetAlert from 'react-bootstrap-sweetalert'
import PhoneIcon from '@material-ui/icons/Phone';

import {
  onChatToggleDrawer
} from 'actions/Chat';
class Header extends React.Component { 

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    })
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    })
  };
  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
    })
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    })
  };
  onAppsSelect = () => {
    this.setState({
      apps: !this.state.apps
    })
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    })
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false
    });
  };
  onToggleCollapsedNav = (e) => {
    // const val = !this.props.navCollapsed;
    // this.props.toggleCollapsedNav(val);
    this.props.userSignOut();
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: '',
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
      showDialog: false
    }
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }


  onChatToggleDrawer = () =>{
    this.props.onChatToggleDrawer();
  }

  onConfirm = () => {
    this.setState({
      showDialog: false
    });
    this.props.userSignOut();
  };

  onCancel =() =>{
    this.setState({
      showDialog: false
    })
  }
  
  showPopup =() =>{
    this.setState({
      showDialog: true
    });
  }

  render() {
    const {drawerType, locale, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

    return (
      <AppBar
        className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
          <SweetAlert
          {...this.props}
          show={this.state.showDialog}
          title={'Are you sure want to Logout?'}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          warning
          showCancel
          confirmBtnText={'Yes'}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          cancelBtnText="No"
        />
        <Toolbar className="app-toolbar" disableGutters={false}>
          {navigationStyle === HORIZONTAL_NAVIGATION ?
            <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
                            <span className="jr-menu-icon">
                              <span className="menu-icon"/>
                            </span>
            </div>
            :
            <div className="list-inline-item app-tou">
              <div className="header-notifications list-inline ml-auto">

              <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                        onClick={this.onChatToggleDrawer}>
                      <MenuIcon />
            </IconButton>
              </div>
            </div>
          }
      
        {/* 
          <Link className="app-logo mr-2 d-none d-sm-block" to="/">
            <img src={require("assets/images/agentz.png")} alt="Agentz" title="Agentz"/>
          </Link> */}
          
          <div id="selectedUser" className="chat-contact-name" style={{color: "white"
    ,fontWeight: "500",fontSize: "20px"}}></div>

          {/* {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
          <Menu/>} */}

           <ul className="header-notifications list-inline ml-auto">
            
            <li className="list-inline-item app-tour">
               <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                        >
                                 <div id="phone" style={{display:"none"}}>
               <a id="phone-anchor"  itemprop="telephone" dir="ltr" style={{"color": "white"}}>{<PhoneIcon color={"white"} />}</a>
                                 </div>

            </IconButton>
            </li>
            <li className="list-inline-item app-tour">
               <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                        onClick={this.showPopup}>
                                 <ExitToAppIcon color={'white'} />

            </IconButton>
            </li>
           
        </ul>
          
          <div className="ellipse-shape"></div>
          
        </Toolbar>
        
      </AppBar>
    );
  }

}

const mapStateToProps = ({chatData,settings, auth}) => {
  const {drawerType, locale, navigationStyle, horizontalNavPosition} = settings;
  const{onChatToggleDrawer} = chatData;
  const {authUser} = auth;
  return {drawerType, locale, navigationStyle, horizontalNavPosition,onChatToggleDrawer,authUser}
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage,onChatToggleDrawer,userSignOut})(Header));