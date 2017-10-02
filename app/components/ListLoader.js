import React, { Component, PropTypes } from 'react';
import MDSpinner from "react-md-spinner";

class ListLoader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="loading-container">
        <MDSpinner
          className="spinner"
          size="24"
          color1="#00d2d1"
          color2="#474747"
          color3="#ff5e39"
          color4="#d6d6d6"
        />
      </div>
    )
  }
}

export default ListLoader;
