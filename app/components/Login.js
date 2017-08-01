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

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    console.log(this.state)
    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <Header />
          <div className="window-content">
            <div className="pane">
              <form onSubmit={this.handleSubmit}>
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
        </div>
      </div>
    )
  }

}

export default Login
