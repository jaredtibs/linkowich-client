import React, { Component, PropTypes } from 'react';
import MDSpinner from "react-md-spinner";

class SimpleSpinner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const defaultColor = this.props.color || "#b8b8b8"

    return(
      <MDSpinner
        className="spinner"
        size={this.props.size || "18"}
        color1={this.props.color1 || defaultColor}
        color2={this.props.color2 || defaultColor}
        color3={this.props.color3 || defaultColor}
        color4={this.props.color4 || defaultColor}
      />
    )
  }
}

export default SimpleSpinner;
