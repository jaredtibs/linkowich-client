import React, { Component, PropTypes } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <span> Your Profile </span>
        </div>
      </div>
    )
  }
}

export default Profile;
