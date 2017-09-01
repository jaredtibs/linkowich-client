import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Settings from '../components/Settings';
import {logout} from '../actions/user';

class SettingsContainer extends Component {
  render() {
    return(
      <Settings {...this.props} />
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
    logout: () => {
      dispatch(logout())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
