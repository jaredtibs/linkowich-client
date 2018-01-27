const { shell, ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import PastLink from './PastLink';
import ListLoader from './ListLoader';
import SimpleSpinner from './SimpleSpinner';
import UserList from './UserList';
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId && prevProps.userId != this.props.userId) {
      this.props.fetchUserProfile(this.props.userId);
    }
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
    this.props.markLinkSeen(link.id)
  }

  handleAvatarClick() {
    ipcRenderer.send('open-finder');
  }

  vote(postId, type, context) {
    this.props.castVote(postId, type, context)
  }

  renderProfileInfo() {
    const { profile, mine } = this.props;
    const { isSubmitting } = profile;

    let avatarSrc;
    if (profile.avatar && profile.avatar.large.url) {
      avatarSrc = profile.avatar.large.url
    } else if (profile.defaultAvatarColor) {
      avatarSrc = require(`../assets/images/default_avatar_${profile.defaultAvatarColor}.svg`)
    }

    return(
      <div>
        <div className={cx("profile-avatar-container", {"mine": mine})}
             onClick={mine ? this.handleAvatarClick.bind(this) : null}>
          { mine || isSubmitting ?
            <div className="img__overlay">
              { isSubmitting ?
                <SimpleSpinner />
                :
                <i className="material-icons edit-icon">mode_edit</i>
              }
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
    let { mine, profile } = this.props;

    if (history.length > 0) {
      let linkList = history.map(function(link, i) {
        return <PastLink key={i} data={link} onClick={onClick} mine={mine} vote={vote}/>
      });

      return(
        <div className="tab-container"> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-history-container">
          <div className="empty-history-icon">
            <i className="material-icons">ac_unit</i>
          </div>
          <div className="empty-history-text">
            It's feeling a little chilly in here...
          </div>
        </div>
      )
    }
  }

  renderFollowRelationships(context) {
    const { friends } = this.props.profile;

    return(
      <div className="tab-container">
        <UserList
          users={friends}
          context={context}
          follow={this.props.followUser}
          unfollow={this.props.unfollowUser}
        />
      </div>
    )
  }

  renderTabContent() {
    const { profileContext } = this.props.profile;

    switch(profileContext) {
      case 'history':
        return this.renderHistory();
        break;
      default:
        return this.renderFollowRelationships(profileContext);
        break;
    }
  }

  render() {
    const { profile, mine, userId } = this.props;
    const { isFetchingInfo, isFetchingTab, profileContext } = profile;

    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            { isFetchingInfo ? <SimpleSpinner /> : this.renderProfileInfo() }
          </div>
          <div className="lower-container">
            <div className="profile-tabs-container">
              <ul className="tabs">
                <li className={cx({
                  "active" : profileContext === "history",
                })}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("history", userId);
                  }}>History</a>
                </li>
                <li className={cx({
                  "active" : profileContext === "followers",
                  "hidden" : !mine
                })}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("followers");
                  }}>Followers</a>
                </li>
                <li className={cx({
                  "active" : profileContext === "following",
                  "hidden" : !mine
                })}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleProfileContext("following");
                  }}>Following</a>
                </li>
              </ul>

            </div>

            { isFetchingTab ? <ListLoader /> : this.renderTabContent() }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
