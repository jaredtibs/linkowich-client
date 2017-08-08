import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';
import {fetchLinks} from '../actions/feed';

class FeedContainer extends Component {
  render() {
    return(
      <Feed {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLinks: () => {
      dispatch(fetchLinks())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
