import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/header.scss';
import cx from 'classnames';
const headerLogo = require('../assets/images/text_logo.svg');

class Header extends Component {
  constructor(props) {
    super(props)
  }

  hasHeader(location) {
    switch(location) {
      case '/home':
      case '/user/me':
      case '/settings':
        return true;
      default:
        return false;
    }
  }


  render() {
    const { location } = this.props.router;

    if (this.hasHeader(location.pathname)) {
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
            { location.pathname ===  '/home' ?
              <Link to={'/user/me'}>
                <i className={cx("material-icons nav-icon", {"disabled": location.pathname === '/user/me'})}>face</i>
              </Link>
            :
              <div className="empty-nav-container">
              </div>
            }
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

export default connect(mapStateToProps)(Header);
