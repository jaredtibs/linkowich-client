import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Login from '../components/Login';

class LoginContainer extends Component {
  render() {
    return(
      <Login {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, feed} = state;
  return {
    user,
    feed
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
