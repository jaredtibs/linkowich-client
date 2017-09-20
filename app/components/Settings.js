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
          <div className="settings-section settings-account">
            <div className="section-subheader">
              <span>Account</span>
            </div>
            <div className="options-container">
              <div className="settings-option">
                <a className="section-btn" href="#">
                  upgrade to premium
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  change password
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  blocked users
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
                  report a problem
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
                  website
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  privacy policy
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  terms
                </a>
              </div>
            </div>
          </div>
          <div className="settings-section settings-logout">
            <div className="options-container bottom">
              <div className="settings-option">
                <a className="bottom-btn" href="#">clear link history</a>
              </div>
              <div className="settings-option">
                <a className="bottom-btn" href="#" onClick={() => this.props.logout() }>logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
/*
 upgrade to premium
 change password
 blocked users

 FAQ
 Report a problem

 website
 Privacy Policy
 Terms

*/
