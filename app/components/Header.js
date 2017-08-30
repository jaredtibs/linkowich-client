import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className="header">
          <div className="app-title">
            <span className="title-link">link</span>
            <span className="title-o">o</span>
            <span className="title-wich">wich</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
