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
      drawerOpened: false,
      codePlaceholder: "WHERE'S THE CODE AT?",
      emailPlaceholder: "SEND IT"
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    const { followContext } = this.props.friends;
    this.props.fetchFriends(followContext);
  }

  handleFocus(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "press enter to add friend"})
    } else {
      this.setState({emailPlaceholder: "press enter to invite friend"})
    }
  }

  handleBlur(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "WHERE'S THE CODE AT?"})
    } else {
      this.setState({emailPlaceholder: "SEND IT"})
    }
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
            fixedHeight={150}
          >
            <div className="friend-actions-container">

              <div className="inner-container">
                <form id="code-form" onSubmit={this.handleSubmit.bind(this, 'code')}>
                  <input
                    className="invite-input"
                    name="friendCode"
                    placeholder={this.state.codePlaceholder}
                    type="text"
                    value={this.state.friendCode}
                    onFocus={this.handleFocus.bind(this, 'code')}
                    onBlur={this.handleBlur.bind(this, 'code')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className="input-subheader">Ask around</span>
              </div>

              <div className="inner-container">
                <form id="invite-form" onSubmit={this.handleSubmit.bind(this, 'invite')}>
                  <input
                    className="invite-input"
                    name="inviteEmail"
                    placeholder={this.state.emailPlaceholder}
                    type="text"
                    value={this.state.inviteEmail}
                    onFocus={this.handleFocus.bind(this, 'email')}
                    onBlur={this.handleBlur.bind(this, 'email')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className="input-subheader">Email, duh...</span>
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
