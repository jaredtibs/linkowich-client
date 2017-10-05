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
          <img className="icon" src={introIcon} width={36} height={46} />
          <div className="copy-container">
            <TextLoop style={{width: '130px'}}>
              <span className="copy-text">SHARE MUSIC</span>
              <span className="copy-text">SHARE MEMES</span>
              <span className="copy-text">SHARE ARTICLES</span>
              <span className="copy-text">SHARE ANYTHING</span>
              <span className="copy-text">SHARE SOME FIRE</span>
            </TextLoop>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
