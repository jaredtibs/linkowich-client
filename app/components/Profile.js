const { shell } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import defaultAvatar from '../assets/default_avatar.jpeg';
import PastLink from './PastLink'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { username } = this.props.user;
    this.props.fetchHistoricalLinkData();
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
  }

  renderPastLinks() {
    const onClick = this.handleLinkClick.bind(this);
    const { pastLinks } = this.props.user;

    if (pastLinks.length > 0) {
      let linkList = pastLinks.map(function(link, i) {
        return <PastLink key={i} data={link} onClick={onClick} />
      });

      return(
        <div> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-past-links-container">
          <div> You haven't shared any links yet! </div>
        </div>
      )
    }
  }

  render() {
    const { user } = this.props;
    const avatar_src = user.avatar.url ? user.avatar.url : defaultAvatar;

    return(
      <div className="window-content">
        <div className="pane">
          <div className="upper-container">
            <div className="profile-avatar-container">
              <img className="profile-avatar" src={defaultAvatar} />
            </div>
            <div className="profile-info-container">
              <span className="profile-username">{user.username}</span>
            </div>
          </div>
          <div className="lower-container">
            <div className="lower-container-header">
              <span>Your Links</span>
            </div>
            <div className="past-links-container">
              {this.renderPastLinks()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
