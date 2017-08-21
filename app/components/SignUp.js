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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, username, password} = this.state.formData;

    if ((email && username && password) && this.state.formValid) {
      //this.props.signUp(email, username, password);
    }
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <h1 className="title">Sign Up</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label>Email</label>
              <input type="email"
                name="email"
                className="form-control"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text"
                name="username"
                className="form-control"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password"
                name="password"
                className="form-control"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-form btn-primary">Sign Up</button>
              <span> or <Link to="/login">login</Link></span>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default SignUp;
