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
      introCompleted: false
    }

  }

  componentDidMount() {
    this.borderLeft.addEventListener('animationend', this.handleAnimationEnd)
    this.borderRight.addEventListener('animationend', this.handleAnimationEnd)
    this.borderTop.addEventListener('animationend', this.handleAnimationEnd)
    this.borderBottom.addEventListener('animationend', this.handleAnimationEnd)

    let timer = setInterval(this.flip.bind(this), 2000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.borderLeft.removeListener('animationend', this.handleAnimationEnd)
    this.borderRight.removeListener('animationend', this.handleAnimationEnd)
    this.borderTop.removeListener('animationend', this.handleAnimationEnd)
    this.borderBottom.removeListener('animationend', this.handleAnimationEnd)

    this.clearInterval(this.state.timer);
  }

  handleAnimationEnd(event) {
    switch(event.animationName) {
      case 'outlineTop':
        break;
      case 'outlineBottom':
        break;
      case 'outlineRight':
        break;
      case 'outlineLeft':
        break;
    }
  }

  flip() {
    if (this.state.counter === this.state.blurbs.length) {
      clearInterval(this.state.timer);
      this.setState({introCompleted: true})
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
              className={cx("border-left", {"completed": this.state.introCompleted})}></div>
            <div
              ref={(border) => { this.borderRight = border; }}
              className={cx("border-right", {"completed": this.state.introCompleted})}></div>
            <div
              ref={(border) => { this.borderTop = border; }}
              className={cx("border-top", {"completed": this.state.introCompleted})}></div>
            <div
              ref={(border) => { this.borderBottom = border; }}
              className={cx("border-bottom", {"completed": this.state.introCompleted})}></div>
            <span
              className={"copy-text flip-" + this.state.counter}>
              { this.state.currentBlurb }
            </span>
          </div>
        </div>
      </div>
    )
  }

}

export default Intro;
