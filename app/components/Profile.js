const { shell, ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import PastLink from './PastLink';
import ListLoader from './ListLoader';
import SimpleSpinner from './SimpleSpinner';
import cx from 'classnames';
const defaultAvatar = require("../assets/images/default_avatar_blue.svg")

class Profile extends Component {
  constructor(props) {
    super(props)

    ipcRenderer.on('open-finder-reply', (event, fileData) => {
      this.props.updateAvatar(fileData)
    });

    this.state = {
      context: "history"
    }
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

  vote(postId, type, context) {
    this.props.castVote(postId, type, context)
  }

  renderProfileInfo() {
    const { profile, mine } = this.props;
    const avatarSrc = (profile.avatar && profile.avatar.large.url) ? profile.avatar.large.url : defaultAvatar;

    return(
      <div>
        <div className={cx("profile-avatar-container", {"mine": mine})}
             onClick={mine ? this.handleAvatarClick.bind(this) : null}>
          { mine ?
            <div className="img__overlay">
              <i className="material-icons edit-icon">mode_edit</i>
            </div>
            : null }
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
    const vote = this.vote.bind(this);
    const { history } = this.props.profile;
    let { mine } = this.props;

    if (history.length > 0) {
      let linkList = history.map(function(link, i) {
        return <PastLink key={i} data={link} onClick={onClick} mine={mine} vote={vote}/>
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

  renderFriendList() {
    const { friends } = this.props.friends;
    const { profileContext } = this.props.profile;

    return(
      <UserList
        users={friends}
        context={profileContext}
        follow={this.props.followUser}
        unfollow={this.props.unfollowUser}
      />
    )
  }

  renderContent() {
    if (this.props.profileContext === "history") {
      return this.renderHistory();
    } else {
      return this.renderUserList();
    }
  }

  render() {
    const { profile, mine, userId } = this.props;
    const { isFetchingInfo,
            isFetchingTabContent,
            profileContext} = profile;

    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            { isFetchingInfo ? <SimpleSpinner /> : this.renderProfileInfo() }
          </div>
          <div className="lower-container">
            <div className="lower-container-header">
              <ul className="tabs">
                <li className={cx({"active" : profileContext === 'history'})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("history", userId)
                  }}> History </a>
                </li>
                <li className={cx({"active" : profileContext === 'followers'})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("followers", userId);
                  }}> Followers </a>
                </li>
                <li className={cx({"active" : profileContext === 'following'})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("following", userId);
                  }}> Following </a>
                </li>
              </ul>
            </div>

            { isFetchingTabContent ? <ListLoader /> : this.renderContent() }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
