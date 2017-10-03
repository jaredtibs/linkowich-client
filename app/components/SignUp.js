import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import SimpleSpinner from './SimpleSpinner';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      username: '',
      formValid: false,
      emailValid: true,
      emailValidationError: "",
      emailPlaceholder: "Email",
      emailFocused: false,
      usernameValid: true,
      usernameValidationError: "",
      usernamePlaceholder: "Create Username",
      usernameFocused: false,
      passwordValid: true,
      passwordValidationError: "",
      passwordPlaceholder: "Create Password",
      passwordFocused: false,
      serverErrorReceived: false
    }

    this.validateInput.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    const {emailValid, usernameValid, passwordValid} = this.state;
    let validInputs = (emailValid && usernameValid && passwordValid);
    let presentInputs = (this.state.email && this.state.username && this.state.password);
    let formValid = (validInputs && presentInputs);

    this.setState({formValid: formValid});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, username, password} = this.state;

    if ((email && username && password) && this.state.formValid) {
      this.props.signUp(email, username, password);
    }
  }

  validateInput(event) {
    switch(event.target.name) {
      case 'email':
        //if (!this.state.email || this.state.email === "") {
        //  this.setState({emailValid: false, emailValidationError: "Required"});
        if ( this.state.email && this.validateEmail(this.state.email) === false) {
          this.setState({emailValid: false, emailValidationError: "Invalid Email"})
        } else {
          this.setState({emailValid: true, emailValidationError: ""})
        }
        break;
      case 'username':
        // if (!this.state.username || this.state.username === "") {
        //   this.setState({usernameValid: false, usernameValidationError: "Required"});
        if (this.state.username && this.validateUsername(this.state.username) === false) {
          this.setState({usernameValid: false, usernameValidationError: "Invalid Username"})
        } else {
          this.setState({usernameValid: true, usernameValidationError: ""})
        }
        break;
      case 'password':
        //if (!this.state.password || this.state.password === "") {
        //  this.setState({passwordValid: false, passwordValidationError: "Required"});
        if (this.state.password && this.validatePassword(this.state.password) === false) {
          this.setState({passwordValid: false, passwordValidationError: "Password Too Weak"})
        } else {
          this.setState({passwordValid: true, passwordValidationError: ""})
        }
        break;
    }
  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  //TODO tbd
  validateUsername(username) {
    return true;
  }

  //TODO tbd
  validatePassword(password) {
    return true;
  }

  onFocus(event) {
    switch(event.target.name) {
      case 'email':
        this.setState({emailPlaceholder: ''})
        this.setState({emailFocused: true})
        this.setState({formready: true})
        break;
      case 'username':
        this.setState({usernamePlaceholder: ''})
        this.setState({usernameFocused: true})
        break;
      case 'password':
        this.setState({passwordPlaceholder: ''})
        this.setState({passwordFocused: true})
        break;
    }
  }

  onBlur(event) {
    this.validateInput(event)

    switch(event.target.name) {
      case 'email':
        this.setState({emailPlaceholder: 'Email'})
        this.setState({emailFocused: false})
        break;
      case 'username':
        this.setState({usernamePlaceholder: 'Create Username'})
        this.setState({usernameFocused: false})
        break;
      case 'password':
        this.setState({passwordPlaceholder: 'Create Password'})
        this.setState({passwordFocused: false})
        break;
    }
  }

  render() {
    const { loading } = this.props.user;

    return(
      <div className="form-container">
        <form id="signup-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-inputs">
            <div className="input-container">
              <label className={cx("label-helper", {
                  "active": (this.state.emailFocused || this.state.email),
                  "error": !this.state.emailValid})
                }>{ this.state.emailValid ? "Email" : this.state.emailValidationError}</label>
              <input type="email" name="email"
                className={cx("input-field", {"error": !this.state.emailValid})}
                placeholder={this.state.emailPlaceholder}
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container">
              <label className={cx("label-helper", {
                  "active": (this.state.usernameFocused || this.state.username),
                  "error": !this.state.usernameValid
                })}>{ this.state.usernameValid ? "Create Username" : this.state.usernameValidationError }</label>
              <input type="text" name="username"
                name="username"
                className={cx("input-field", {"error": !this.state.usernameValid})}
                placeholder={this.state.usernamePlaceholder}
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container">
              <label className={cx("label-helper", {
                  "active": (this.state.passwordFocused || this.state.password),
                  "error": !this.state.passwordValid
                })}>{ this.state.passwordValid ? "Create Password" : this.state.passwordValidationError }</label>
              <input type="password" name="password"
                name="password"
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
              { loading ? <SimpleSpinner color="white" /> : "SIGNUP" }
            </button>
          </div>
        </form>

      </div>
    )
  }

}

export default SignUp;
