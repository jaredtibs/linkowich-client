import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

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
    this.props.requestLogin(
      this.state.email,
      this.state.password
    )
  }

  // not called as required validation is a bad pattern
  // and you aren't doing any other validations at this point
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
        this.setState({emailPlaceholder: ''})
        this.setState({emailFocused: true})
        this.setState({formready: true})
        break;
      case 'password':
        this.setState({passwordPlaceholder: ''})
        this.setState({passwordFocused: true})
        break;
    }
  }

  onBlur(event) {
    //this.validateInput(event)

    switch(event.target.name) {
      case 'email':
        this.setState({emailPlaceholder: 'Email'})
        this.setState({emailFocused: false})
        break;
      case 'password':
        this.setState({passwordPlaceholder: 'Create Password'})
        this.setState({passwordFocused: false})
        break;
    }
  }


  render() {
    return(
      <div className="form-container">
        <form id="login-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-inputs">
            <div className="input-container">
              <label className={cx("label-helper", {
                  "active": (this.state.emailFocused || this.state.email),
                  "error": !this.state.emailValid})
                }>{ this.state.emailValid ? "Email" : this.state.emailValidationError}</label>
              <input type="email"
                name="email"
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
                  "active": (this.state.passwordFocused || this.state.password),
                  "error": !this.state.passwordValid
                })}>{ this.state.passwordValid ? "Password" : this.state.passwordValidationError }</label>
              <input type="password"
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
            <button type="submit" className="submit-btn">Login</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Login
