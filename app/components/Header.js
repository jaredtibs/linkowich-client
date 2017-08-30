import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <header className="header">
          <h4 className="app-title">linkowich</h4>
        </header>
      </div>
    )
  }
}

export default Header;
