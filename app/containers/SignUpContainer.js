import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {} from '../actions/user';
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
