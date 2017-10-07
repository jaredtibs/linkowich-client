const { shell, ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import defaultAvatar from '../assets/default_avatar.jpeg';
import PastLink from './PastLink';
import ListLoader from './ListLoader';

class Profile extends Component {
  constructor(props) {
    super(props)

    ipcRenderer.on('open-finder-reply', (event, fileData) => {
      this.props.updateAvatar(fileData)
    });
  }

  componentDidMount() {
    const { username } = this.props.user;
    this.props.fetchHistoricalLinkData();
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
  }

  handleAvatarClick() {
    ipcRenderer.send('open-finder');
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
        <div className="empty-profile-links">
          <div className="empty-text"> You haven't shared any links yet! </div>
        </div>
      )
    }
  }

  render() {
    const { user } = this.props;
    const { isFetching } = user;
    const avatarSrc = user.avatar ? user.avatar.large.url : defaultAvatar;

    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            <div className="profile-avatar-container"
                 onClick={this.handleAvatarClick.bind(this)}
            >
              <div className="img__overlay">Edit</div>
              <img className="profile-avatar" src={avatarSrc} />
            </div>
            <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
            <div className="profile-info-container">
              <div className="profile-username">{user.username}</div>
              <div className="profile-score">
                <span className="vote-count">{user.score}</span>
                <i className="material-icons vote-icon">whatshot</i>
              </div>
            </div>
          </div>
          <div className="lower-container">
            <div className="lower-container-header">
              <span>History</span>
            </div>

            { isFetching ? <ListLoader /> : this.renderPastLinks() }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
