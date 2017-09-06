import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchFollowing, fetchFollowers} from '../actions/friends';
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
    fetchFollowing: () => {
      dispatch(fetchFollowing())
    },

    fetchFollowers: () => {
      dispatch(fetchFollowers())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
