import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import TextLoop from 'react-text-loop';
const introIcon = require('../assets/intro_icon.svg');

class Intro extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const items = ["hello world"]
    const duration = 3000;

    return(
      <div className="intro-container">
        <div className="content-container">
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className="copy-container">
            <TextLoop style={{width: '156px'}}>
              <span className="copy-text">SHARE SOME MUSIC</span>
              <span className="copy-text">SHARE SOME MEMES</span>
              <span className="copy-text">SHARE SOME NEWS</span>
              <span className="copy-text padded">SHARE ANYTHING</span>
              <span className="copy-text padded">SHARE SOME FIRE</span>
            </TextLoop>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
