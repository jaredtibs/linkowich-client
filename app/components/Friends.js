import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.css';
import UserList from './UserList';

class Friends extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //TODO change to match default tab
    this.props.fetchFollowing()
  }

  render() {
    let { following } = this.props.friends;

    return(
      <div className="window-content">
        <div className="pane">

          <div className="header-nav">
            <div className="header-section"
                 onClick={() => this.props.history.goBack()}>
              <i className="material-icons close">close</i>
            </div>
            <div className="header-section">
              <span className="header-title"> Friends </span>
            </div>
            <div className="header-section invite">
              <span> Invite </span>
            </div>
          </div>

          <div className="friends-container">
            <div className="friends-header-container">
            </div>

            <div className="following-container">
              <div className="following-header-container">
                <span> Following </span>
              </div>

              <div className="users-container">
                <UserList users={following}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
