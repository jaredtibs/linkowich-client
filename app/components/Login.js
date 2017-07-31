import React, { Component, PropTypes } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
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
    )
  }

}

export default Login
