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

    this.state = {
      context: "history"
    }

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
        <div className="tab-container"> {linkList} </div>
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
    const { isFetchingInfo, isFetchingHistory } = profile;

    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            { isFetchingInfo ? <SimpleSpinner /> : this.renderProfileInfo() }
          </div>
          <div className="lower-container">
            <div className="profile-tabs-container">
              <ul className="tabs">
                <li className={cx({"active" : this.state.context === "history"})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.setState({context: "history"})
                  }}>History</a>
                </li>
                <li className={cx({"active" : this.state.context === "followers"})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.setState({context: "followers"})
                  }}>Followers</a>
                </li>
                <li className={cx({"active" : this.state.context === "following"})}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    this.setState({context: "following"})
                  }}>Following</a>
                </li>
              </ul>

            </div>

            { isFetchingHistory ? <ListLoader /> : this.renderHistory() }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
