import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.css';

class Friends extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <div className="friends-container">

            <div className="friends-header-container">
              <span> header stuff </span>
            </div>

            <div className="following-container">
              <div className="following-header-container">
              </div>
              <div className="users-container">
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
