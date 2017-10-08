import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
const introIcon = require('../assets/intro_icon.svg');

class Intro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: null,
      counter: 0,
      currentBlurb: "SHARE SOME MUSIC",
      blurbs: [
        'SHARE SOME MEMES',
        'SHARE SOME NEWS',
        'SHARE ANYTHING',
        'SHARE SOME FIRE'
      ],
      introCompleted: false,
      topLeftAnimationActive: false,
      topRightAnimationActive: false,
      bottomLeftAnimationActive: false,
      bottomRightAnimationActive: false,
      leftAnimationActive: false,
      rightAnimationActive: false,
      animationsCompleted: false
    }
  }

  componentDidMount() {
    this.borderLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))

    let timer = setInterval(this.flip.bind(this), 2000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.borderLeft.removeListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderRight.removeListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopLeft.removeListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopRight.removeListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomLeft.removeListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomRight.removeListener('animationend', this.handleAnimationEnd.bind(this))

    this.clearInterval(this.state.timer);
  }

  handleAnimationEnd(event) {
    switch(event.animationName) {
      case 'outlineTopLeft':
        this.setState({leftAnimationActive: true})
        break;
      case 'outlineTopRight':
        this.setState({animationsCompleted: true})
        break;
      case 'outlineBottomRight':
        this.setState({rightAnimationActive: true})
        break;
      case 'outlineRight':
        this.setState({topRightAnimationActive: true})
        break;
      case 'outlineLeft':
        this.setState({bottomLeftAnimationActive: true})
        break;
    }
  }

  flip() {
    if (this.state.counter === this.state.blurbs.length) {
      clearInterval(this.state.timer);
      this.setState({
        introCompleted: true,
        topLeftAnimationActive: true,
        bottomRightAnimationActive: true})
    } else {
      this.setState({
        counter: this.state.counter + 1,
        currentBlurb: this.state.blurbs[this.state.counter]
      });
    }
  }

  render() {
    return(
      <div className="intro-container">
        <div className="content-container">
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className={cx("copy-container", {"completed": this.state.introCompleted})}>
            <div
              ref={(border) => { this.borderLeft = border; }}
              className={cx("border-left", {"active": this.state.leftAnimationActive})}></div>
            <div
              ref={(border) => { this.borderRight = border; }}
              className={cx("border-right", {"active": this.state.rightAnimationActive})}></div>
            <div
              ref={(border) => { this.borderTopLeft = border; }}
              className={cx("border-top-left", {"active": this.state.topLeftAnimationActive})}></div>
            <div
              ref={(border) => { this.borderTopRight = border; }}
              className={cx("border-top-right", {"active": this.state.topRightAnimationActive})}></div>
            <div
              ref={(border) => { this.borderBottomLeft = border; }}
              className={cx("border-bottom-left", {"active": this.state.bottomLeftAnimationActive})}></div>
            <div
              ref={(border) => { this.borderBottomRight = border; }}
              className={cx("border-bottom-right", {"active": this.state.bottomRightAnimationActive})}></div>
            <span className={cx("copy-text", {[`flip-${this.state.counter}`]: !this.state.animationsCompleted}, {'animations-finished': this.state.animationsCompleted})}>
              { this.state.animationsCompleted ? "LETS GO" : this.state.currentBlurb }
            </span>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
