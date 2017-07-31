import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
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
    )
  }
}

export default Footer;
