import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
const defaultAvatar = require("../assets/images/default_avatar_blue.svg")

class InvitationIntro extends Component {
  constructor(props) {
    super(props)

    this.mounted = false;
  }

  componentDidMount() {
    this.props.fetchInvitations();
    this.mounted = true;
    setTimeout(() => this.mounted = false, 2000);
  }

  onClick() {
    const invitation = this.props.user.invitations[0];
    this.props.acceptInvite(invitation.id);
  }

  onSkip() {
    this.props.history.push("/home");
  }

  renderInvitationHeader(invitation) {
    const sender = invitation.attributes.sender.data;
    const senderAttributes = sender.attributes;
    const { avatar, username } = senderAttributes;
    const avatarSrc = avatar.url ? avatar.url : defaultAvatar;

    return(
      <div className="invitation-header-container">
          <div className="sender-avatar-container">
            <img className="sender-avatar" src={avatarSrc} />
          </div>
          <div className="sender-username">{username}</div>
          <div className="sender-msg">Added you as a friend.</div>
      </div>
    )
  }

  render() {
    const { user } = this.props;
    //for now just grabbing the first invitation
    const invitation = user.invitations[0];

    return(
      <div className={cx("intro-container invitation", {"mounted": this.mounted})}>
        { invitation ? this.renderInvitationHeader(invitation) : null }

        <div className="invitation-btns-container">
          <div className="add-friend-btn" onClick={this.onClick.bind(this)}>
            <span> ADD FRIEND </span>
          </div>
          <div className="invitation-skip-container">
            <a href="#" className="invitation-skip-text" onClick={(e) => {
              e.preventDefault();
              this.onSkip();
            }}>
              skip
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default InvitationIntro;
