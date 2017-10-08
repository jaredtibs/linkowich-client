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
    let timer = setInterval(this.flip.bind(this), 2000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
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
    console.log(this.state.counter)
    return(
      <div className="intro-container">
        <div className="content-container">
          <img className="icon" src={introIcon} width={46} height={56} />
          <div className={cx("copy-container", {"completed": this.state.introCompleted})}>
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
