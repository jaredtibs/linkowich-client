import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="header">
        <div className="header-section">
          <i className="material-icons settings">settings</i>
        </div>
        <div className="app-title header-section">
          <span className="title-link">link</span>
          <span className="title-o">o</span>
          <span className="title-wich">wich</span>
        </div>
        <div className="header-section">
          <i className="material-icons user">face</i>
        </div>
      </div>
    )
  }
}

export default Header;
