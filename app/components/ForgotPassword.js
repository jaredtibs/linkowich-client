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
      <div className="window-content">
        <div className="forgot-pswd-container">
          <div className="forgot-pswd-header-nav">
            <div className="forgot-pswd-header-section back"
                  onClick={() => this.props.history.goBack()}>
              <i className="material-icons arrow">arrow_back</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword;
