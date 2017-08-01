import React, { Component, PropTypes } from 'react';
import Header from './Header'
import Footer from './Footer'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <Header />
          <div className="window-content">
            <div className="pane">
              <form>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" id="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" id="password" className="form-control" placeholder="Password" />
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
