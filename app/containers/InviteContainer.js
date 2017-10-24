import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { inviteUser, addFriendByCode } from '../actions/invite';
import Invite from '../components/Invite';

class InviteContainer extends Component {
  render() {
    return(
      <Invite {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, invite } = state;
  return {
    user,
    invite
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
