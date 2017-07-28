import React, { Component, PropTypes } from 'react';

class Feed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <header className="toolbar toolbar-header">
            <h1 className="title">Lynx</h1>
          </header>
          <div className="window-content">
            <div className="pane">
              <div className="summary js-summary">Loading&hellip;</div>
              <div id="links-container"></div>
            </div>
          </div>

          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions pull-left">
              <button className="btn btn-default js-refresh-action">
                <span className="icon icon-arrows-ccw js-refresh-action" title="Refresh"></span>
              </button>
            </div>

            <div className="toolbar-actions pull-right">
              <button className="btn btn-default js-add-subscription-action">
                <span className="icon icon-user-add js-add-subscription-action" title="Add Subscription"></span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default Feed
