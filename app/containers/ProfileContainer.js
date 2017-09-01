import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  render() {
    return(
      <Profile {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
