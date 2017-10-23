import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { inviteUser, addFriendByCode } from '../actions/friends';
import Invite from '../components/Invite';

class InviteContainer extends Component {
  render() {
    return(
      <Invite {...this.props} />
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
    inviteUser: (email) => {
      dispatch(inviteUser(email))
    },

    addFriendByCode: (code) => {
      dispatch(addFriendByCode(code))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteContainer);
