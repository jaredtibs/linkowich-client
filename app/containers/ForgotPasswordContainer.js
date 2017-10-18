import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {resetPassword} from '../actions/user';
import ForgotPassword from '../components/ForgotPassword';

class ForgotPasswordContainer extends Component {
  render() {
    return(
      <ForgotPassword {...this.props } />
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
    resetPassword: () => {
      dispatch(resetPassword())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
