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
          <div className="settings-inner-container settings-invite">
            <div className="settings-subheader">
              <span>invite</span>
            </div>
          </div>
          <div className="settings-inner-container settings-follow">
            <div className="settings-subheader">
              <span>follow</span>
            </div>
          </div>
          <div className="settings-inner-container settings-account">
            <div className="settings-subheader">
              <span>account</span>
            </div>
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
