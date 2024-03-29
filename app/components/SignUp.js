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
      passwordFocused: false
    }

    this.validateInput.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    const { fieldErrors } = user;

    if (!prevProps.user.hasError && user.hasError && Object.keys(fieldErrors).length > 0) {
      if (fieldErrors.email) {
        this.setState({
          emailValid: false,
          emailValidationError: fieldErrors.email.message
        })
      }

      if (fieldErrors.username) {
        this.setState({
          usernameValid: false,
          usernameValidationError: fieldErrors.username.message
        })
      }
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    const {emailValid, usernameValid, passwordValid, password} = this.state;
    let validInputs = (emailValid && usernameValid && passwordValid && password.length >= 7);
    let presentInputs = (this.state.email && this.state.username && this.state.password);
    let formValid = (validInputs && presentInputs);

    this.setState({formValid: formValid});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, username, password} = this.state;

    if (!email) {
      this.setState({emailValid: false, emailValidationError: "Required"})
    }

    if (!username) {
      this.setState({usernameValid: false, usernameValidationError: "Required"})
    }

    if (!password) {
      this.setState({passwordValid: false, passwordValidationError: "Required"})
    }

    if (password && password.length < 8) {
      this.setState({passwordValid: false, passwordValidationError: "Password too weak"})
    }

    if ((email && username && password) && this.state.formValid) {
      this.props.signUp(email, username, password);
    }
  }

  validateInput(event) {
    switch(event.target.name) {
      case 'email':
        if ( this.state.email && this.validateEmail(this.state.email) === false) {
          this.setState({emailValid: false, emailValidationError: "Invalid Email"})
        } else {
          this.setState({emailValid: true, emailValidationError: ""})
        }
        break;
      case 'username':
        if (this.state.username && this.validateUsername(this.state.username) === false) {
          this.setState({usernameValid: false, usernameValidationError: "Invalid Username"})
        } else {
          this.setState({usernameValid: true, usernameValidationError: ""})
        }
        break;
      case 'password':
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

  validatePassword(password) {
    return (password && password.length >= 8);
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
      case 'username':
        this.setState({
          usernamePlaceholder: '',
          usernameFocused: true,
          usernameValidationError: '',
          usernameValid: true
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
    this.validateInput(event)

    switch(event.target.name) {
      case 'email':
        this.setState({
          emailPlaceholder: 'Email',
          emailFocused: false
        })
        break;
      case 'username':
        this.setState({
          usernamePlaceholder: 'Create Username',
          usernameFocused: false
        })
        break;
      case 'password':
        this.setState({
          passwordPlaceholder: 'Create Password',
          passwordFocused: false
        })
        break;
    }
  }

  render() {
    const { loading } = this.props.user;

    return(
      <div className="form-container">
        <form id="signup-form" onSubmit={this.handleSubmit.bind(this)}>
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
            <div className="input-container" onClick={() => {this.username.focus()}}>
              <label className={cx("label-helper", {
                  "active": (this.state.usernameFocused || this.state.username),
                  "error": !this.state.usernameValid
                })}>{ this.state.usernameValid ? "Create Username" : this.state.usernameValidationError }</label>
              <input type="text" name="username"
                ref={(username) => this.username = username}
                className={cx("input-field", {"error": !this.state.usernameValid})}
                placeholder={this.state.usernamePlaceholder}
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container" onClick={() => {this.password.focus()}}>
              <label className={cx("label-helper", {
                  "active": (this.state.passwordFocused || this.state.password),
                  "error": !this.state.passwordValid
                })}>{ this.state.passwordValid ? "Create Password" : this.state.passwordValidationError }</label>
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
              { loading ? <SimpleSpinner color="white" /> : "SIGNUP" }
            </button>
          </div>
        </form>

      </div>
    )
  }

}

export default SignUp;
