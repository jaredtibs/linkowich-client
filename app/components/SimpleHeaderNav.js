import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/header_nav.scss';

class SimpleHeaderNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="simple-header-nav">

        <div className="simple-header-section left"
              onClick={() => this.props.history.goBack()}>
          <i className="material-icons arrow">arrow_back</i>
        </div>

        <div className="simple-header-section title">
          <span className="simple-header-title">{this.props.title}</span>
        </div>

        <div className="simple-header-section right">
        </div>
      </div>
    )
  }
}

export default SimpleHeaderNav;

