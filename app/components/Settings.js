import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/settings.scss';
import Modal from 'react-modal';
import cx from 'classnames';
const { shell, ipcRenderer } = window.require('electron');

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 125,
    left              : 0,
    right             : 0,
    bottom            : 145,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    textAlign         : 'center'
  },

  content : {
    position                   : 'absolute',
    top                        : '76px',
    left                       : '50px',
    right                      : '50px',
    bottom                     : '138px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  quitApp() {
    ipcRenderer.send('quit-app');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { linkCount } = this.props.user;

    return(
      <div className="window-content">
        <div className="settings-container">
          <div className="settings-section settings-account">
            <div className="section-subheader">
              <span>Account</span>
            </div>
            <div className="options-container">
              <div className="settings-option">
                <a className="section-btn disabled">
                  Upgrade to premium
                </a>
                <span id="coming-soon"> coming soon! </span>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#">
                  Blocked users
                </a>
              </div>
              <div className="settings-option">
                <a className="section-btn" href="#" onClick={(e) => {
                  e.preventDefault();
                  shell.openExternal("https://goo.gl/forms/sQ9DOgpZxwKxl3wU2");
                }}>
                  Submit Feedback
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
                <a className="section-btn" href="#" onClick={(e) => {
                  e.preventDefault();
                  shell.openExternal("https://linkowi.ch");
                }}>
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
                <a className={cx("bottom-btn", {"disabled": (linkCount <= 0)})} href="#" onClick={(e) => {
                  e.preventDefault();
                  linkCount > 0 && this.openModal();
                }}>
                  Clear link history
                </a>
              </div>
              <div className="settings-option">
                <a className="bottom-btn" href="#" onClick={() => this.props.logout() }>
                  Logout
                </a>
              </div>
              <div className="settings-option">
                <a className="bottom-btn" href="#" onClick={() => this.quitApp() }>
                  Quit
                </a>
              </div>
            </div>
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            style={modalStyles}
            contentLabel="Clear History Confirmation"
          >
            <span className="clear-history-confirmation">
              Are you sure you want to clear your entire link history?
            </span>
            <div className="clear-confirmation-btns">
              <a className="confirm-link" href="#" onClick={(e) => {
                e.preventDefault();
                this.props.clearLinkHistory();
                this.closeModal();
              }}>
                <span className="clear-yes">YES</span>
              </a>

              <a className="confirm-link" href="#" onClick={(e) => {
                e.preventDefault();
                this.closeModal();
              }}>
                <span className="clear-no">NO</span>
              </a>
            </div>
          </Modal>

        </div>
      </div>
    )
  }
}

export default Settings;
