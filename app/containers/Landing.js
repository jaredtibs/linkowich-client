import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/landing.scss';
import formStyles from '../assets/stylesheets/landing_forms.scss';
import cx from 'classnames';
import LoginContainer from './LoginContainer'
import SignUpContainer from './SignUpContainer'
import ForgotPasswordContainer from './ForgotPasswordContainer'

const imageLogo = require('../assets/images/image_logo.svg');
const textLogo = require('../assets/images/text_logo.svg');

class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      context: "signup"
    }

    this.handleContextSwitch = this.handleContextSwitch.bind(this);
  }

  handleContextSwitch(context) {
    this.setState({context: context});
  }

  renderContext() {
    switch(this.state.context) {
      case 'signup':
        return <SignUpContainer />
        break;
      case 'login':
        return <LoginContainer contextSwitch={this.handleContextSwitch} />
        break;
      case 'forgotPassword':
        return <ForgotPasswordContainer />
        break;
    }
  }

  render() {
    return(
      <div className="landing-container">
        <div className="logo-container">
          <img src={imageLogo} width={78} height={86} />
          <img className="text-logo" src={textLogo} width={190} height={30} />
          <span className="subheader">SHARE SOME FIRE</span>
        </div>
        <div className="forms-container">
          <div className="form-tabs-container">
            <ul className="tabs">
              <li className={cx({"active" : this.state.context === "signup"})}>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  this.setState({context: "signup"});
                }}> Signup </a>
              </li>
              <li className={cx({"active" : this.state.context === "login"})}>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  this.setState({context: "login"});
                }}> Login </a>
              </li>
            </ul>
          </div>

          { this.renderContext() }

        </div>
      </div>
    )
  }
}

export default Landing;
