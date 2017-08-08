import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';
import {fetchLinks} from '../actions/feed';
import {fetchUserSession} from '../actions/user';

class FeedContainer extends Component {
  render() {
    return(
      <Feed {...this.props} />
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
    fetchLinks: () => {
      dispatch(fetchLinks())
    },

    fetchUserSession: () => {
      dispatch(fetchUserSession())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
