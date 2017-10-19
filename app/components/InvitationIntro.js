import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
import defaultAvatar from '../assets/images/default_avatar.jpeg';

class InvitationIntro extends Component {
  constructor(props) {
    super(props)
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
            <span> Username goes here </span>
            <span>Added you as a friend. </span>
          </div>
        </div>
        <div className="invitation-btns-container">
        </div>
      </div>
    )
  }
}

export default InvitationIntro;
