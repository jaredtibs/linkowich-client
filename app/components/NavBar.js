import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/navbar.scss';
import cx from 'classnames';
const headerLogo = require('../assets/images/text_logo.svg');

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  hasNav(location) {
    switch(location) {
      case '/home':
      case '/settings':
        return true;
      case (location.match(/user\/*/) || {}).input:
        return true;
      default:
        return false;
    }
  }

  renderNavRight(location) {
    switch(location) {
      case '/home':
        return(
          <div className="nav-section-right">
            <Link to={'/invite'}>
              <i className="material-icons nav-icon invite-icon small">group_add</i>
            </Link>
            <Link to={'/user/me'}>
              <i className={cx("material-icons nav-icon", {"disabled": location === '/user/me'})}>face</i>
            </Link>
          </div>
        )
        break;
      case '/user/me':
        return(
          <Link to={'/invite'}>
            <i className="material-icons invite-icon">group_add</i>
          </Link>
        )
        break;
      default:
        return <div className="empty-nav-container"></div>
        break;
    }
  }


  render() {
    const { location } = this.props.router;

    if (this.hasNav(location.pathname)) {
      return(
        <div className="header">
          <div className="header-section left">
            { location.pathname === '/home' ?
              <Link to={'/settings'}>
                <i className={cx("material-icons nav-icon", {"disabled": location.pathname === '/settings'})}>settings</i>
              </Link>
              :
              <Link to={'/home'}>
                <i className="material-icons arrow">arrow_back</i>
              </Link>
            }
          </div>
          <div className="app-title header-section">
            <Link to={'/home'}>
              <img src={headerLogo} width={90} height={30} />
            </Link>
          </div>
          <div className="header-section right">
            { this.renderNavRight(location.pathname) }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NavBar);
