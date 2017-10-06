import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import {spring} from 'react-motion';
import {ReactMotionLoop} from 'react-motion-loop';
const introIcon = require('../assets/intro_icon.svg');

class Intro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      headerCopy: "SHARE SOME MUSIC"
    }

    this.onRest.bind(this);
  }

  onRest() {
    //this.setState({headerCopy: "SHARE SOME NEWS"})
    console.log("RESTING")
  }

  render() {
    return(
      <div className="intro-container">
        <div className="content-container">
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className="copy-container">
            <ReactMotionLoop
              styleFrom={{width: spring(0), height: spring(0)}}
              styleTo={{width: spring(100), height: spring(100)}}>
              {style => <div className="copy-text" style={style}> { this.state.headerCopy } </div> }
            </ReactMotionLoop>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
