import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Share from '../components/Share';
import {
  publishLink,
  fetchCurrentLink,
  fetchScore,
  clearLink } from '../actions/share';

class ShareContainer extends Component {
  render() {
    return(
      <Share {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { share, user } = state;
  return {
    share,
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    publishLink: (url) => {
      dispatch(publishLink(url))
    },

    fetchCurrentLink: () => {
      dispatch(fetchCurrentLink())
    },

    fetchScore: () => {
      dispatch(fetchScore())
    },

    clearLink: () => {
      dispatch(clearLink())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareContainer);
