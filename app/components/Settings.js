import React, { Component, PropTypes } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="settings-container">
          <button className="btn btn-default" onClick={() => this.props.logout() }>
            <span> Logout </span>
          </button>
        </div>
      </div>
    )
  }
}

export default Settings;
