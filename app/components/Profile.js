import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/profile.scss';
import defaultAvatar from '../assets/default_avatar.jpeg';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  renderPastLinks() {
      /*
    let { links } = this.props.user;

    if (links.length > 0) {
      let linkList = links.map(function(link, i) {
        return <FeedLink key={i} data={link} onClick={onClick} />
      });

      return(
        <div> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-feed-container">
          <div className="empty-feed-text"> follow people and what they share will appear here </div>
        </div>
      )
    }
    */
  }

  render() {
    return(
      <div className="window-content">
        <div className="profile-container">
          <div className="upper-container">
            <div className="profile-avatar-container">
              <img className="profile-avatar" src={defaultAvatar} />
            </div>
            <div className="profile-info-container">
              <span className="profile-username">jaredtibs</span>
            </div>
          </div>
          <div className="lower-container">
            <span>Your Links</span>
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
