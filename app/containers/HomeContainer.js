import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Home from '../components/Home';

class HomeContainer extends Component {
  render() {
    return(
      <Home {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
