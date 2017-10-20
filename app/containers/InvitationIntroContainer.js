import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchInvitations, acceptInvite} from '../actions/intro.js';
import InvitationIntro from '../components/InvitationIntro';

class InvitationIntroContainer extends Component {
  render() {
    return(
      <InvitationIntro {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvitations: () => {
      dispatch(fetchInvitations())
    },

    acceptInvite: (inviteId) => {
      dispatch(acceptInvite(inviteId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationIntroContainer);
