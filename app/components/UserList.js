import React, { Component } from 'react';
//TODO install and change import on all components + add checking
//import PropTypes from 'prop-types'
import defaultAvatar from "../assets/default_avatar.jpeg"

class UserList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let { users } = this.props;

    if (users.length > 0) {
      let userList = users.map((user, index) => {
        let { avatar, username } = user.attributes;
        let avatar_src = avatar.url ? avatar.url : defaultAvatar;

        return(
          <div className="users-container">
            <div key={user.id} className="user-row">
              <div className="user-info-container">
                <div className="user-avatar">
                  <img src={avatar_src} width={40} height={40} />
                </div>
                <div className="user-username-container">
                  <div className="user-username">{username}</div>
                  <div className="user-subtext">following you</div>
                </div>
              </div>
              <div className="user-action-container">
                <span className="minus">-</span>
                <i className="material-icons unfollow">perm_identity</i>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        )
      })

      return(
        <div> {userList} </div>
      )
    } else {
      return(
        <div> you're not following anyone </div>
      )
    }
  }
}

export default UserList;
