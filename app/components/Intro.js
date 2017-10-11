import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/intro.scss';
import cx from 'classnames';
const introIcon = require('../assets/images/intro_icon.svg');

class Intro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: null,
      counter: 0,
      showSkip: false,
      greetText: "WELCOME TO LINKOWICH",
      greets: [
        "A PLACE FOR YOU AND YOUR FRIENDS",
        "FOR ALL THOSE LINKS YOU CAN'T STOP SHARING",
        "KEEP 'EM HERE AND KEEP THE CLUTTER FREE...",
      ],
      blurbText: "SHARE SOME MUSIC",
      blurbs: [
        'SHARE SOME MEMES',
        'SHARE SOME NEWS',
        'SHARE ANYTHING',
        'SHARE SOME FIRE'
      ],
      greetsStarted: false,
      greetsFinished: false,
      blurbsStarted: false,
      blurbsFinished: false,
      introStarted: false,
      introFinished: false,
      borderAnimationCompleted: false,
      topLeftAnimationActive: false,
      topRightAnimationActive: false,
      bottomLeftAnimationActive: false,
      bottomRightAnimationActive: false,
      leftAnimationActive: false,
      rightAnimationActive: false,
    }
  }

  componentDidMount() {
    this.borderLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomLeft.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomRight.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.buttonText.addEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.content.addEventListener('animationend', this.handleAnimationEnd.bind(this))

    let timer = setInterval(this.greet.bind(this), 3000);
    this.setState({timer, introStarted: true, greetsStarted: true});
  }

  componentWillUnmount() {
    this.borderLeft.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderRight.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopLeft.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderTopRight.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomLeft.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.borderBottomRight.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.buttonText.removeEventListener('animationend', this.handleAnimationEnd.bind(this))
    this.content.removeEventListener('animationend', this.handleAnimationEnd.bind(this))

    clearInterval(this.state.timer);
  }

  handleAnimationEnd(event) {
    switch(event.animationName) {
      case 'outlineTopLeft':
        this.setState({leftAnimationActive: true})
        break;
      case 'outlineTopRight':
        this.setState({borderAnimationCompleted: true})
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
      case 'fadeInIntro':
        this.setState({showSkip: true})
        break;
      case 'fadeInFinish':
        this.setState({introFinished: true, showSkip: false})
        break;
    }
  }

  flip() {
    if (this.state.counter === this.state.blurbs.length) {
      clearInterval(this.state.timer);
      this.setState({
        blurbsFinished: true,
        topLeftAnimationActive: true,
        bottomRightAnimationActive: true
      })
    } else {
      this.setState({
        counter: this.state.counter + 1,
        blurbText: this.state.blurbs[this.state.counter]
      });
    }
  }

  greet() {
    if (this.state.counter === this.state.greets.length) {
      clearInterval(this.state.timer);
      let timer = setInterval(this.flip.bind(this), 1500);
      this.setState({
        timer,
        counter: 0,
        greetsFinished: true,
        blurbsStarted: true
      })
    } else {
      this.setState({
        counter: this.state.counter + 1,
        greetText: this.state.greets[this.state.counter]
      })
    }
  }

  onClick() {
    if (this.state.introFinished) {
      this.props.history.push("/home");
    }
  }

  onSkip() {
    this.props.history.push("/home");
  }

  render() {
    return(
      <div className="intro-container">
        <div
          ref={(content) => { this.content = content; }}
          className={cx("content-container", {"started": this.state.introStarted})}>
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className={
               cx("copy-container", {"completed": this.state.introFinished, "blurbs": this.state.blurbsStarted})}
               onClick={this.onClick.bind(this)}>
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

            { this.state.blurbsStarted ?
              <span
                ref={(text) => { this.buttonText = text; }}
                className={cx("copy-text", {[`flip-${this.state.counter}`]: !this.state.borderAnimationCompleted}, {'animations-finished': this.state.borderAnimationCompleted})}>
                { this.state.borderAnimationCompleted ? "COOL. LET ME IN" : this.state.blurbText }
              </span>
              :
              <span
              ref={(text) => { this.buttonText = text; }}
              className={cx("copy-text", `greet-${this.state.counter}`)}> { this.state.greetText } </span>
            }
          </div>
        </div>

        <div className="skip-container">
          <a href="#"
              className={cx("skip-text", {"active": this.state.showSkip})}
              onClick={this.onSkip.bind(this)}>
              skip
          </a>
        </div>
      </div>
    )
  }

}

export default Intro;
