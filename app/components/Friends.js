import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.scss';
import cx from 'classnames';
import UserList from './UserList';
import {Collapse} from 'react-collapse';

class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inviteOpened: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { followContext } = this.props.friends;
    this.props.fetchFriends(followContext);
  }

  _toggleInviteDrawer() {
    this.setState({inviteOpened: !this.state.inviteOpened})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitting!')
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target.value)
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
              <div onClick={() => this._toggleInviteDrawer()}>Invite</div>
            </div>
          </div>

          <Collapse
            className="collapsed-container"
            isOpened={this.state.inviteOpened}
            fixedHeight={100}
          >
            <div className="friend-actions-container">
              <div className="inner-container">
                <form id="invite-form" onSubmit={this.handleSubmit}>
                  <input
                    placeholder="invite by email"
                    onChange={this.handleChange}
                  />
                </form>
                <span className="input-subheader">invite a friend by email</span>
              </div>
              <div className="inner-divider-container">- or -</div>
              <div className="inner-container">
                <form id="code-form" onSubmit={this.handleSubmit}>
                  <input
                    placeholder="add by code"
                    onChange={this.handleChange}
                  />
                </form>
                <span className="input-subheader">enter a friend's code</span>
              </div>
            </div>
          </Collapse>

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
