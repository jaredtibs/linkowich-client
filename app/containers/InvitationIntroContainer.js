import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationIntroContainer);
