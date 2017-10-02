import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

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
      usernameValid: true,
      usernameValidationError: "",
      passwordValid: true,
      passwordValidationError: "",
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

  render() {
    return(
      <div className="form-container">
        <form id="signup-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-container">
            <input type="email"
              className="input-field"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="input-container">
            <input type="text"
              name="username"
              className="input-field"
              placeholder="Create Username"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="input-container">
            <input type="password"
              name="password"
              className="input-field"
              placeholder="Create Password"
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </form>
      </div>
    )
  }

}

export default SignUp;
