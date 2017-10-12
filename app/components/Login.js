import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import SimpleSpinner from './SimpleSpinner';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formValid: false,
      email: '',
      emailValid: true,
      emailValidationError: '',
      emailPlaceholder: "Email",
      emailFocused: false,
      password: '',
      passwordValid: true,
      passwordValidationError: '',
      passwordPlaceholder: "Password",
      passwordFocused: false
    }

    this.validateInput.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});

    const {emailValid, passwordValid} = this.state;
    let validInputs = (emailValid && passwordValid);
    let presentInputs = (this.state.email && this.state.password);
    let formValid = (validInputs && presentInputs);

    this.setState({formValid: formValid});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(
      this.state.email,
      this.state.password
    )
  }

  validateInput(event) {
    switch(event.target.name) {
      case 'email':
        if (!this.state.email || this.state.email === "") {
          this.setState({emailValid: false, emailValidationError: "Required"});
        } else {
          this.setState({emailValid: true, emailValidationError: ""})
        }
        break;
      case 'password':
        if (!this.state.password || this.state.password === "") {
          this.setState({passwordValid: false, passwordValidationError: "Required"});
        } else {
          this.setState({passwordValid: true, passwordValidationError: ""})
        }
        break;
    }
  }

  onFocus(event) {
    switch(event.target.name) {
      case 'email':
        this.setState({
          emailPlaceholder: '',
          emailFocused: true,
          emailValidationError: '',
          emailValid: true
        })
        break;
      case 'password':
        this.setState({
          passwordPlaceholder: '',
          passwordFocused: true,
          passwordValidationError: '',
          passwordValid: true
        })
        break;
    }
  }

  onBlur(event) {
    // currently not validating login inputs
    //this.validateInput(event)

    switch(event.target.name) {
      case 'email':
        this.setState({
          emailPlaceholder: 'Email',
          emailFocused: false
        })
        break;
      case 'password':
        this.setState({
          passwordPlaceholder: 'Password',
          passwordFocused: false
        })
        break;
    }
  }


  render() {
    const { loading } = this.props.user;

    return(
      <div className="form-container">
        <form id="login-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-inputs">
            <div className="input-container" onClick={() => {this.email.focus()}}>
              <label className={cx("label-helper", {
                  "active": (this.state.emailFocused || this.state.email),
                  "error": !this.state.emailValid})
                }>{ this.state.emailValid ? "Email" : this.state.emailValidationError}</label>
              <input type="email" name="email"
                ref={(email) => this.email = email}
                className={cx("input-field", {"error": !this.state.emailValid})}
                placeholder={this.state.emailPlaceholder}
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container" onClick={() => {this.password.focus()}}>
              <label className={cx("label-helper", {
                  "active": (this.state.passwordFocused || this.state.password),
                  "error": !this.state.passwordValid
                })}>{ this.state.passwordValid ? "Password" : this.state.passwordValidationError }</label>
              <input type="password" name="password"
                ref={(password) => this.password = password}
                className={cx("input-field", {"error": !this.state.passwordValid})}
                placeholder={this.state.passwordPlaceholder}
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
          </div>
          <div className={cx("submit-btn-container", {"submit-ready": this.state.formValid})}>
            <button type="submit" className="submit-btn">
              { loading ? <SimpleSpinner color="white" /> : "LOGIN" }
            </button>
          </div>
        </form>
      </div>
    )
  }

}

export default Login
