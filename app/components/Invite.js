import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/invite.scss';
import cx from 'classnames';
import SimpleHeaderNav from '../components/SimpleHeaderNav';

class Invite extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      inviteEmail: '',
      friendCode: '',
      emailValid: true,
      emailValidationError: '',
      codeValid: true,
      codeValidationError: '',
      codePlaceholder: "GOT A FRIEND'S CODE?",
      emailPlaceholder: "SEND IT",
      codeSubheader: "Ask Around",
      emailSubheader: "Email, duh..."
    }

    this.state = this.defaultState;
  }

  handleSubmit(type, event) {
    event.preventDefault();

    const { inviteEmail, friendCode } = this.state;

    if (type === 'invite') {
      if (!this.validateEmail(inviteEmail)) {
        this.setState({
          emailValid: false,
          emailSubheader: "Invalid Email"
        })
      } else {
        this.props.inviteUser(inviteEmail);
        this.setState(this.defaultState);
      }
    } else {
      if (!this.validateCode(friendCode)) {
        this.setState({
          codeValid: false,
          codeSubheader: "Invalid Code"
        })
      } else {
        this.props.addFriendByCode(friendCode);
        this.setState(this.defaultState);
      }
    }

  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
      emailValid: true,
      codeValid: true,
      codeSubheader: "Ask Around",
      emailSubheader: "Email, duh..."
    })
  }


  handleFocus(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "press enter to add friend"})
    } else {
      this.setState({
        emailPlaceholder: "press enter to invite friend"
      })
    }
  }

  handleBlur(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "WHERE'S THE CODE AT?"})
    } else {
      this.setState({emailPlaceholder: "SEND IT"})
    }
  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  validateCode(code) {
    const regex = /^[\da-f]{10}$/i;
    return regex.test(code);
  }

  render() {
    const { user } = this.props;

    return(
      <div className="window-content">
        <div className="invite-container">
          <SimpleHeaderNav title="Add Friends" history={this.props.history} />

          <div className="invite-upper-container">
            <div className="friend-actions-container">

              <div className="inner-container">
                <form id="code-form" onSubmit={this.handleSubmit.bind(this, 'code')}>
                  <input
                    className={cx("invite-input", {"error": !this.state.codeValid})}
                    name="friendCode"
                    placeholder={this.state.codePlaceholder}
                    type="text"
                    value={this.state.friendCode}
                    onFocus={this.handleFocus.bind(this, 'code')}
                    onBlur={this.handleBlur.bind(this, 'code')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className={cx("input-subheader", {"error": !this.state.codeValid})}>
                  {this.state.codeSubheader}
                </span>
              </div>

              <div className="inner-container">
                <form id="invite-form" onSubmit={this.handleSubmit.bind(this, 'invite')}>
                  <input
                    className={cx("invite-input", {"error": !this.state.emailValid})}
                    name="inviteEmail"
                    placeholder={this.state.emailPlaceholder}
                    type="text"
                    value={this.state.inviteEmail}
                    onFocus={this.handleFocus.bind(this, 'email')}
                    onBlur={this.handleBlur.bind(this, 'email')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className={cx("input-subheader", {"error": !this.state.emailValid})}>
                  {this.state.emailSubheader}
                </span>
              </div>
            </div>

          </div>

          <div className="invite-lower-container">
            <div className="code-icon-container">
              <i className="material-icons">code</i>
            </div>
            <div className="my-code-container">
              <div className="my-code-header">Your Code:</div>
              <div className="my-code-value">{user.followCode}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Invite;
