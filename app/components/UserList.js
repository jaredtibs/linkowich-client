import React, { Component } from 'react';
import EmptyFeedCTA from './EmptyFeedCTA';
const defaultAvatar = require("../assets/images/default_avatar_blue.svg")
import styles from '../assets/stylesheets/user_list.scss';

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
        return <EmptyFeedCTA topPadding={10}/>
    }
  }
}

export default UserList;
