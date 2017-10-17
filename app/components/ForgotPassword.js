import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/forgot_password.scss';
import formStyles from '../assets/stylesheets/landing_forms.scss';
import cx from 'classnames';

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: true,
      emailValidationError: '',
      emailPlaceholder: 'Enter the email tied to your account'
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email} = this.state;
    //validate here
    // initiate api request here
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onFocus(event) {
    switch(event.target.name) {
      case 'email':
        this.setState({
          emailPlaceholder: '',
          emailValidationError: '',
          emailValid: true
        })
    }
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
          <div className="forgot-pswd-form-container">
            <form id="forgot-pswd-form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="input-container forgot-pswd" onClick={() => {this.email.focus()}}>
                <input name="email"
                  ref={(email) => this.email = email}
                  className={cx("input-field forgot-pswd", {"error": !this.state.emailValid})}
                  value={this.state.email}
                  placeholder="Enter the email address tied to your account"
                  onChange={this.handleChange.bind(this)}
                  onFocus={this.onFocus.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword;
