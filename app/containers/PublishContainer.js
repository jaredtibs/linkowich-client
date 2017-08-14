import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Publish from '../components/Publish';
import {publishLink} from '../actions/publish';


class PublishContainer extends Component {
  render() {
    return(
      <Publish {...this.props} />
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer);
