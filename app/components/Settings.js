import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/settings.scss';
const { ipcRenderer } = window.require('electron');

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  quitApp() {
    ipcRenderer.send('quit-app');
  }

  render() {
    return(
      <div className="window-content">
        <div className="settings-container">
          <div className="settings-section settings-account">
            <div className="section-subheader">
              <span>Account</span>
            </div>
            <div className="options-container">
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Upgrade to premium
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Change password
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Blocked users
                </a>
              </div>
            </div>
          </div>
          <div className="settings-section settings-support">
            <div className="section-subheader">
              <span>Support</span>
            </div>
            <div className="options-container">
              <div className="settings-option">
                <a className="section-btn" href="#">
                  FAQ
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Report a problem
                </a>
              </div>
            </div>
          </div>
          <div className="settings-section settings-about">
            <div className="section-subheader">
              <span>About</span>
            </div>
            <div className="options-container">
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Website
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Privacy policy
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Terms
                </a>
              </div>
            </div>
          </div>
          <div className="settings-section settings-logout">
            <div className="options-container bottom">
              <div className="settings-option">
                <a className="bottom-btn" href="#">Clear link history</a>
              </div>
              <div className="settings-option">
                <a className="bottom-btn" href="#" onClick={() => this.props.logout() }>Logout</a>
              </div>
              <div className="settings-option">
                <a className="bottom-btn" href="#" onClick={() => this.quitApp() }>Quit App</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
