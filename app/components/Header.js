import React, { Component, PropTypes } from 'react';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">Lynx</h1>
        </header>
      </div>
    )
  }
}

export default Header;
