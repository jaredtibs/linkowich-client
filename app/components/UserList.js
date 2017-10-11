import React, { Component } from 'react';
//TODO install and change import on all components + add checking
//import PropTypes from 'prop-types'
import defaultAvatar from "../assets/images/default_avatar.jpeg"

class UserList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { users, context } = this.props;

    if (users.length > 0) {
      const userList = users.map((user, index) => {
        const { avatar, username } = user.attributes;
        const avatar_src = avatar.url ? avatar.url : defaultAvatar;

        return(
          <div key={user.id} className="user-row">
            <div className="user-info-container">
              <div className="user-avatar">
                <img src={avatar_src} width={40} height={40} />
              </div>
              <div className="user-username">{username}</div>
            </div>
            <div className="user-action-container">
              { user.attributes['is-following'] ?
                <div className="action-btn following" onClick={() => this.props.unfollow(user.id) }>
                  <span className="following-text">Following</span>
                </div>
                : <div className="action-btn follow" onClick={() => this.props.follow(user.id) }>
                  <span className="follow-text">Follow</span>
                </div>
              }
            </div>
          </div>
        )
      })

      return(
        <div> {userList} </div>
      )
    } else {
      if (context === "following") {
        return(
          <div className="empty-list-container">
            <span> Bummer. You're not following anyone </span>
          </div>
        )
      } else {
        return(
          <div className="empty-list-container">
            <span>Shoot. You don't have any followers. Invite some friends above! </span>
          </div>
        )
      }
    }
  }
}

export default UserList;
