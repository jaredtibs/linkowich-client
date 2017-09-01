import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Settings from '../components/Settings';

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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
