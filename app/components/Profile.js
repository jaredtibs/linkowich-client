const { shell, ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import defaultAvatar from '../assets/images/default_avatar.jpeg';
import PastLink from './PastLink';
import ListLoader from './ListLoader';
import SimpleSpinner from './SimpleSpinner';
import cx from 'classnames';

class Profile extends Component {
  constructor(props) {
    super(props)

    ipcRenderer.on('open-finder-reply', (event, fileData) => {
      this.props.updateAvatar(fileData)
    });
  }

  componentDidMount() {
    this.props.fetchUserProfile(this.props.userId);
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
  }

  handleAvatarClick() {
    ipcRenderer.send('open-finder');
  }

  renderProfileInfo() {
    const { profile, mine } = this.props;
    const avatarSrc = profile.avatar ? profile.avatar.large.url : defaultAvatar;

    return(
      <div>
        <div className={cx("profile-avatar-container", {"mine": mine})}
             onClick={mine ? this.handleAvatarClick.bind(this) : null}>
          { mine ? <div className="img__overlay">Edit</div> : null }
          <img className="profile-avatar" src={avatarSrc} />
        </div>

        <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>

        <div className="profile-info-container">
          <div className="profile-username">{profile.username}</div>
          <div className="profile-score">
            <span className="vote-count">{profile.score}</span>
            <i className="material-icons vote-icon">whatshot</i>
          </div>
        </div>

      </div>
    )
  }

  renderHistory() {
    const onClick = this.handleLinkClick.bind(this);
    const { history } = this.props.profile;

    if (history.length > 0) {
      let linkList = history.map(function(link, i) {
        return <PastLink key={i} data={link} onClick={onClick} />
      });

      return(
        <div className="history-container"> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-profile-links">
          <div className="empty-text"> You haven't shared any links yet! </div>
        </div>
      )
    }
  }

  render() {
    const { profile, mine } = this.props;
    const { isFetching } = profile;

    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            { isFetching ? <SimpleSpinner /> : this.renderProfileInfo() }
          </div>
          <div className="lower-container">
            <div className="lower-container-header">
              <span>{ mine ? "My history" : `${profile.username}'s history` }</span>
            </div>

            { isFetching ? <ListLoader /> : this.renderHistory() }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
