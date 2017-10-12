import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../actions/profile';
import {updateAvatar} from '../actions/user';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  render() {
    return(
      <Profile {...this.props }
        userId={this.props.match.params.id}
        mine={this.props.match.params.id === "me"}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, profile } = state;
  return {
    user,
    profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => {
      dispatch(fetchUserProfile(id))
    },

    updateAvatar: (fileData) => {
      dispatch(updateAvatar(fileData))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
