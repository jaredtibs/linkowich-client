import React, { Component, PropTypes } from 'react';
import Header from './Header'
import Footer from './Footer'

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
      <div className="window-content">
        <div className="pane">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email"
                name="email"
                className="form-control"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-form btn-primary">OK</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default Login
