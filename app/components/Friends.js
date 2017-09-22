import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.scss';
import cx from 'classnames';
import UserList from './UserList';
import {Collapse} from 'react-collapse';

class Friends extends Component {
  constructor(props) {
    super(props)
    this.defaultState = {
      inviteEmail: '',
      friendCode: '',
      drawerOpened: false
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    const { followContext } = this.props.friends;
    this.props.fetchFriends(followContext);
  }

  _toggleInviteDrawer() {
    this.setState({drawerOpened: !this.state.drawerOpened})
  }

  handleSubmit(type, event) {
    event.preventDefault();
    const { followContext } = this.props.friends;

    if (type === 'invite') {
      //this.props.inviteByEmail(this.state.inviteEmail);
    } else {
      this.props.addByCode(this.state.friendCode, followContext);
    }

    this.setState(this.defaultState);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value})
  }


  renderLoadingState() {
    return(
      <div className="loading-container">
        <span className="loading-text"> Loading... </span>
      </div>
    )
  }

  render() {
    const { friends,
            isFetching,
            followContext } = this.props.friends;

    return(
      <div className="window-content">
        <div className="main-container">
          <div className="header-nav">
            <div className="header-section back"
                 onClick={() => this.props.history.goBack()}>
              <i className="material-icons arrow-back">arrow_back</i>
            </div>
            <div className="header-section title">
              <span className="header-title"> Friends </span>
            </div>
            <div className="header-section invite">
              <div className="invite-container" onClick={() => this._toggleInviteDrawer()}>
                <i className="material-icons invite-icon">group_add</i>
                <span>Invite</span>
              </div>
            </div>
          </div>

          <Collapse
            className="collapsed-container"
            isOpened={this.state.drawerOpened}
            fixedHeight={100}
          >
            <div className="friend-actions-container">
              <div className="inner-container">
                <form id="invite-form" onSubmit={this.handleSubmit.bind(this, 'invite')}>
                  <input
                    name="inviteEmail"
                    placeholder="invite by email"
                    type="text"
                    value={this.state.inviteEmail}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className="input-subheader">invite a friend by email</span>
              </div>
              <div className="inner-divider-container">- or -</div>
              <div className="inner-container">
                <form id="code-form" onSubmit={this.handleSubmit.bind(this, 'code')}>
                  <input
                    name="friendCode"
                    placeholder="add by code"
                    type="text"
                    value={this.state.friendCode}
                    onChange={this.handleChange.bind(this)}
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
                  <li className={cx({"active" : followContext === 'followers'})}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      this.props.toggleFollowContext("followers");
                    }}> Followers </a>
                  </li>
                  <li className={cx({"active" : followContext === 'following'})}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      this.props.toggleFollowContext("following");
                    }}> Following </a>
                  </li>
                </ul>
              </div>

              <div className="users-container">
                { !isFetching ?
                  <UserList users={friends} context={followContext}/>
                  : this.renderLoadingState() }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
