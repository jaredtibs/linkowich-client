import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.scss';
import cx from 'classnames';
import UserList from './UserList';

class Friends extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { followContext } = this.props.friends;
    this.props.fetchFriends(followContext);
  }

  _openInviteDrawer() {
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
    let { friends,
          isFetching,
          followContext } = this.props.friends;

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
              <div onClick={() => this._openInviteDrawer()}>Invite</div>
            </div>
          </div>

          <div className="friends-container">

            <div className="following-container">
              <div className="following-header-container">
                <ul className="tabs">
                  <li className={cx({"active" : followContext === 'following'})}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      this.props.toggleFollowContext("following");
                    }}> Following </a>
                  </li>
                  <li className={cx({"active" : followContext === 'followers'})}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      this.props.toggleFollowContext("followers");
                    }}> Followers </a>
                  </li>
                </ul>
              </div>

              { !isFetching ?
                <UserList users={friends} context={followContext}/>
                : this.renderLoadingState() }
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
