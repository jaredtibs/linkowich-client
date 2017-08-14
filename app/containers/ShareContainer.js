import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Share from '../components/Share';
import {publishLink, fetchCurrentLink} from '../actions/share';

class ShareContainer extends Component {
  render() {
    return(
      <Share {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, feed } = state;
  return {
    user,
    feed
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    publishLink: (url) => {
      dispatch(publishLink(url))
    },

    fetchCurrentLink: () => {
      dispatch(fetchCurrentLink())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareContainer);
