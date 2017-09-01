import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
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
  }
}

export default Header;
