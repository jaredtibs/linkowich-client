const { shell, ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import AvatarEditor from 'react-avatar-editor'
import PastLink from './PastLink';
import ListLoader from './ListLoader';
import SimpleSpinner from './SimpleSpinner';
import UserList from './UserList';
import cx from 'classnames';
const defaultAvatar = require("../assets/images/default_avatar_blue.svg")

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedImage: null
    }

    ipcRenderer.on('open-finder-reply', (event, fileData) => {
      //this.props.updateAvatar(fileData)
      this.setState({selectedImage: fileData})
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

  vote(postId, type, context) {
    this.props.castVote(postId, type, context)
  }

  renderAvatarEditor() {
    return(
      <div className="profile-avatar-container">
        <AvatarEditor
          image="https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg"
          width={120}
          height={120}
          borderRadius={110}
          scale={1.2}
          rotate={0}
        />
      </div>
    )
  }

  renderProfileInfo() {
    const { profile, mine } = this.props;
    const avatarSrc = (profile.avatar && profile.avatar.large.url) ? profile.avatar.large.url : defaultAvatar;

    return(
      <div>
        { this.state.selectedImage ?
          this.renderAvatarEditor()
          :
          <div className={cx("profile-avatar-container", {"mine": mine})}
              onClick={mine ? this.handleAvatarClick.bind(this) : null}>
            { mine ?
              <div className="img__overlay">
                <i className="material-icons edit-icon">mode_edit</i>
              </div>
              : null }
            <img className="profile-avatar" src={avatarSrc} />
          </div>
        }

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
        <div className="tab-container"> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-profile-links">
          <div className="empty-text">Go share some links already! </div>
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
