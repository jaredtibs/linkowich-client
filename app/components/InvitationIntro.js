import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
import defaultAvatar from '../assets/images/default_avatar.jpeg';

class InvitationIntro extends Component {
  constructor(props) {
    super(props)
  }

  onClick() {
    console.log("adding friend!")
  }

  onSkip() {
    console.log("skipping friend!")
  }

  render() {
    const avatarSrc = defaultAvatar;
    return(
      <div className="intro-container">
        <div className="invitation-header-container">
          <div className="sender-avatar-container">
            <img className="sender-avatar" src={avatarSrc} />
          </div>
          <div className="senderUsername">Jtibs</div>
          <div className="senderDetail">Added you as a friend.</div>
        </div>

        <div className="invitation-btns-container">
          <div className="add-friend-btn" onClick={this.onClick.bind(this)}>
            <span> ADD FRIEND </span>
          </div>
          <div className="invitation-skip-container">
            <a href="#" className="invitation-skip-text" onClick={this.onSkip.bind(this)}>
              SKIP
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default InvitationIntro;
