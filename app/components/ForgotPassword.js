import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/forgot_password.scss';
import cx from 'classnames';

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="forgot-pswd-container">
        Forgot your password, eh?
      </div>
    )
  }
}

export default ForgotPassword;
