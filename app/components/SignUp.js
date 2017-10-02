import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

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

    //TODO remove for real validation
    this.state.formValid = true;

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, username, password} = this.state;

    if ((email && username && password) && this.state.formValid) {
      this.props.signUp(email, username, password);
    }
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
    return(
      <div className="form-container">
        <form id="signup-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-inputs">
            <div className="input-container">
              <label className={cx("label-helper", {"active": this.state.emailFocused})}>Email</label>
              <input type="email" name="email"
                className="input-field"
                placeholder={this.state.emailPlaceholder}
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container">
              <label className={cx("label-helper", {"active": this.state.usernameFocused})}>Create Username</label>
              <input type="text" name="username"
                name="username"
                className="input-field"
                placeholder={this.state.usernamePlaceholder}
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="input-container">
              <label className={cx("label-helper", {"active": this.state.passwordFocused})}>Create Password</label>
              <input type="password" name="password"
                name="password"
                className="input-field"
                placeholder={this.state.passwordPlaceholder}
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
          </div>

          <div className={cx("submit-btn-container", {"submit-ready": this.state.formValid})}>
            <button type="submit" className="submit-btn">Signup</button>
          </div>
        </form>

      </div>
    )
  }

}

export default SignUp;
