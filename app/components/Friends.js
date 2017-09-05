import React, { Component, PropTypes } from 'react';

class Friends extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <div className="friends-container">
          </div>
        </div>
      </div>
    )
  }
}

export default Friends;
