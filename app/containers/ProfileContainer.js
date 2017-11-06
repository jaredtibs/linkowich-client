import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  fetchUserProfile,
  updateAvatar,
  toggleProfileContext,
  updateFollowRelationship,
} from '../actions/profile';

import { castVote, markLinkSeen } from '../actions/feed';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  render() {
    const { match } = this.props;

    return(
      <Profile {...this.props }
        userId={match.params.id}
        mine={match.params.id === "me"}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, profile, friends } = state;
  return {
    user,
    profile,
    friends
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => {
      dispatch(fetchUserProfile(id))
    },

    updateAvatar: (fileData) => {
      dispatch(updateAvatar(fileData))
    },

    castVote: (linkId, type, context) => {
      dispatch(castVote(linkId, type, context))
    },

    markLinkSeen: (linkId) => {
      dispatch(markLinkSeen(linkId))
    },

    toggleProfileContext: (context, userId) => {
      dispatch(toggleProfileContext(context, userId))
    },

    followUser: (userId) => {
      dispatch(updateFollowRelationship(userId, 'follow'))
    },

    unfollowUser: (userId) => {
      dispatch(updateFollowRelationship(userId, 'unfollow'))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
