import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/header.scss';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  hasHeader(location) {
    switch(location) {
      case '/home':
      case '/profile':
      case '/settings':
        return true;
      default:
        return false;
    }
  }


  render() {
    let { location } = this.props.router;

    if (this.hasHeader(location.pathname)) {
      return(
        <div className="header">
          <div className="header-section">
            <Link to={'/settings'}>
              <i className="material-icons settings">settings</i>
            </Link>
          </div>
          <div className="app-title header-section">
            <Link to={'/home'}>
              <span className="title-link">link</span>
              <span className="title-o">o</span>
              <span className="title-wich">wich</span>
            </Link>
          </div>
          <div className="header-section">
            <Link to={'/profile'}>
              <i className="material-icons user">face</i>
            </Link>
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
