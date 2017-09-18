import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchHistoricalLinkData, updateAvatar} from '../actions/user';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  render() {
    return(
      <Profile {...this.props} />
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
    fetchHistoricalLinkData: () => {
      dispatch(fetchHistoricalLinkData())
    },

    updateAvatar: (fileData) => {
      dispatch(updateAvatar(fileData))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
