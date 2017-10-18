import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/forgot_password.scss';
import formStyles from '../assets/stylesheets/landing_forms.scss';
import cx from 'classnames';

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: true,
      emailValidationError: '',
      emailPlaceholder: 'Email',
      emailFocused: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email} = this.state;

    if (!email) {
      this.setState({emailValid: false, emailValidationError: "Required"})
    }

    if (email && !this.validateEmail(email)) {
      this.setState({emailValid: false, emailValidationError: "Invalid Email"})
    }

    if (this.state.emailValid) {
      console.log("initating api request")
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  validateEmail(email) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
  }


  onFocus() {
    this.setState({
      emailPlaceholder: '',
      emailValidationError: '',
      emailValid: true,
      emailFocused: true
    })
  }

  onBlur() {
    this.setState({
      emailPlaceholder: 'Email',
      emailFocused: false
    });
  }

  render() {
    return(
      <div className="form-container">
        <form id="forgot-pswd-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="forgot-pswd-header-section">
            <div className="forgot-pswd-header">
              What is the email address associated with your account?
            </div>
          </div>
          <div className="input-container forgot-pswd" onClick={() => {this.email.focus()}}>
            <label className={cx("label-helper", {
                  "active": (this.state.emailFocused || this.state.email),
                  "error": !this.state.emailValid})
                }>{ this.state.emailValid ? "Email" : this.state.emailValidationError}</label>

            <input name="email"
              ref={(email) => this.email = email}
              className={cx("input-field", {"error": !this.state.emailValid})}
              value={this.state.email}
              placeholder={this.state.emailPlaceholder}
              onChange={this.handleChange.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
          </div>

          <div className="forgot-pswd-btns-container">
            <button type="submit" className="reset-pswd-btn">
              Reset
            </button>
          </div>

        </form>
      </div>
    )
  }
}

export default ForgotPassword;
