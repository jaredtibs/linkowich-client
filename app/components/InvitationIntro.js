import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
import defaultAvatar from '../assets/images/default_avatar.jpeg';

class InvitationIntro extends Component {
  constructor(props) {
    super(props)
  }

  onSkip() {
    console.log("skipping invitation!")
  }

  render() {
    const avatarSrc = defaultAvatar;
    return(
      <div className="intro-container">
        <div className="invitation-header-container">
          <div className="invitation-avatar-container">
            <img className="sender-avatar" src={avatarSrc} />
          </div>
          <div className="invitation-info-container">
            <div className="senderUsername">Jtibs</div>
            <div className="senderDetail">Added you as a friend.</div>
          </div>
        </div>

        <div className="invitation-btns-container">
          <div className="add-friend-btn">
            <span className="copy-text"> ADD FRIEND </span>
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
