import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';
import {fetchLinks, markLinkSeen} from '../actions/feed';

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

    markLinkSeen: (linkId) => {
      dispatch(markLinkSeen(linkId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
