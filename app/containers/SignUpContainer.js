import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/user';
import SignUp from '../components/SignUp';

class SignUpContainer extends Component {
  render() {
    return(
      <SignUp {...this.props} />
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
    signUp: (email, username, password) => {
      dispatch(register(email, username, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
