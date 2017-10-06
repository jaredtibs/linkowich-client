import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import {Motion, spring} from 'react-motion';
const introIcon = require('../assets/intro_icon.svg');

class Intro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      headerCopy: "SHARE SOME MUSIC"
    }
  }

  handleAnimationLeave() {
    console.log("animation over")
  }

  render() {
    return(
      <div className="intro-container">
        <div className="content-container">
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className="copy-container">
            <Motion defaultStyle={{ width: 0 }} style={{width: spring(10)}} onRest={this.handleAnimationLeave.bind(this)} >
              {style => <div className="copy-text" style={style}> {this.state.headerCopy} </div>}
            </Motion>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
