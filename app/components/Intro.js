import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
const introIcon = require('../assets/intro_icon.svg');


class Intro extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const items = ["hello world"]
    const duration = 2000;

    return(
      <div className="intro-container">
        <div className="content-container">
          <div className="icon-container">
            <img className="icon" src={introIcon} width={36} height={46} />
          </div>
          <div className="copy-container">
            <span className="copy-text"> SHARE SOME MUSIC </span>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
