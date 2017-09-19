import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="settings-container">
          <div className="settings-invite-container">
            <span> invite </span>
          </div>
          <div className="settings-follow-container">
            <span> follow </span>
          </div>
          <div className="settings-account-container">
            <span> account </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
  /*
          <button className="btn btn-default" onClick={() => this.props.logout() }>
            <span> Logout </span>
          </button>
          */
