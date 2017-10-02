import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.requestLogin(
      this.state.email,
      this.state.password
    )
  }

  render() {
    return(
      <div className="form-container">
        <form id="login-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-input">
            <input type="email"
              name="email"
              className="form-control"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-input">
            <input type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="submit-btn-container">
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Login
