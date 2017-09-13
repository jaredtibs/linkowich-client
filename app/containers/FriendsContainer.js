import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { fetchFriends,
         toggleFollowContext,
         addByCode } from '../actions/friends';
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

    addByCode: (code, context) => {
      dispatch(addByCode(code, context))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
