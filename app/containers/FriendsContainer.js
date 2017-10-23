import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  fetchFriends,
  toggleFollowContext,
  updateFollowRelationship,
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
      dispatch(updateFollowRelationship(userId, 'follow'))
    },

    unfollowUser: (userId) => {
      dispatch(updateFollowRelationship(userId, 'unfollow'))
    },

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
