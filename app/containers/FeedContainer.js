import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';
import {
  fetchLinks,
  markLinkSeen,
  castVote } from '../actions/feed';

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
    fetchLinks: (showLoader) => {
      dispatch(fetchLinks(showLoader))
    },

    markLinkSeen: (linkId) => {
      dispatch(markLinkSeen(linkId))
    },

    castVote: (linkId, type) => {
      dispatch(castVote(linkId, type))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
