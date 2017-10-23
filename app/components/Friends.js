import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/friends.scss';
import cx from 'classnames';
import UserList from './UserList';
import {Collapse} from 'react-collapse';
import ListLoader from './ListLoader';
import SimpleHeaderNav from '../components/SimpleHeaderNav';

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
      this.props.addFriendByCode(this.state.friendCode, followContext);
    }

    this.setState(this.defaultState);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value})
  }

  render() {
    const { friends,
            isFetching,
            followContext } = this.props.friends;

    return(
      <div className="window-content">
        <div className="main-container">
          <SimpleHeaderNav title="Friends" history={this.props.history} />

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
                <span className="input-subheader">Invite a friend</span>
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
                { isFetching ?
                  <ListLoader /> :
                  <UserList
                    users={friends}
                    context={followContext}
                    follow={this.props.followUser}
                    unfollow={this.props.unfollowUser}
                  />
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
