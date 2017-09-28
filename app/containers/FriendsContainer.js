import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  fetchFriends,
  toggleFollowContext,
  followUser,
  unfollowUser,
  addFriendByCode,
  inviteUser } from '../actions/friends';
import Friends from '../components/Friends';

class FriendsContainer extends Component {
  render() {
    return(
      <Friends {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, friends } = state;
  return {
    user,
    friends
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFriends: (context) => {
      dispatch(fetchFriends(context))
    },

    toggleFollowContext: (context) => {
      dispatch(toggleFollowContext(context))
    },

    followUser: (userId) => {
      dispatch(followUser(userId))
    },

    unfollowUser: (userId) => {
      dispatch(unfollowUser(userId))
    },

    inviteUser: (email) => {
      dispatch(inviteUser(email))
    },

    addFriendByCode: (code, context) => {
      dispatch(addFriendByCode(code, context))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
