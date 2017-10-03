import React, { Component, PropTypes } from 'react';
import MDSpinner from "react-md-spinner";

class SimpleSpinner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <MDSpinner
        className="spinner"
        size={this.props.size || "18"}
        color1={this.props.color || "#ffffff"}
        color2={this.props.color || "#ffffff"}
        color3={this.props.color || "#ffffff"}
        color4={this.props.color || "#ffffff"}
      />
    )
  }
}

export default SimpleSpinner;
