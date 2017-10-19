import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Intro from '../components/Intro';

class IntroContainer extends Component {
  render() {
    return(
      <Intro {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroContainer);
