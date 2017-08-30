import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  //TODO hacky - improve
  _loggedIn() {
    return(localStorage.getItem('userToken') !== null)
  }

  render() {
    return(
      <footer className="toolbar toolbar-footer">
        <div className="toolbar-actions pull-left">
          <button className="btn btn-default">
            <span className="icon icon-arrows-ccw" title="Refresh"></span>
          </button>
        </div>

        { this._loggedIn() ?
          <div className="toolbar-actions pull-left">
            <button className="btn btn-default" onClick={() => this.props.logout() }>
              <span> Logout </span>
            </button>
          </div>
        : null }

        <div className="toolbar-actions pull-right">
          <button className="btn btn-default">
            <span className="icon icon-user-add" title="Add Subscription"></span>
          </button>
        </div>
      </footer>
    )
  }
}

export default Footer;
