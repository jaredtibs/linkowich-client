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

  openInviteDrawer() {
    console.log("opening drawer!")
  }

  renderLoadingState() {
    return(
      <div className="loading-container">
        <span className="loading-text"> Loading... </span>
      </div>
    )
  }

  render() {
    let { following, isFetching } = this.props.friends;

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
              <div onClick={() => this.openInviteDrawer()}>Invite</div>
            </div>
          </div>

          <div className="friends-container">

            <div className="following-container">
              <div className="following-header-container">
                <span> Following </span>
              </div>

              { !isFetching ?
                <UserList users={following}/>
                : this.renderLoadingState() }
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
