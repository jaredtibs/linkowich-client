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
      drawerOpened: false,
      codePlaceholder: "GOT A FRIEND'S CODE?",
      emailPlaceholder: "SEND IT"
    }

    this.state = this.defaultState;
  }

  handleSubmit(type, event) {
    event.preventDefault();

    if (type === 'invite') {
      this.props.inviteUser(this.state.inviteEmail);
    } else {
      this.props.addFriendByCode(this.state.friendCode);
    }

    this.setState(this.defaultState);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value})
  }


  handleFocus(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "press enter to add friend"})
    } else {
      this.setState({emailPlaceholder: "press enter to invite friend"})
    }
  }

  handleBlur(type) {
    if (type === "code") {
      this.setState({codePlaceholder: "WHERE'S THE CODE AT?"})
    } else {
      this.setState({emailPlaceholder: "SEND IT"})
    }
  }


  render() {
    const { user } = this.props;

    return(
      <div className="window-content">
        <div className="invite-container">
          <SimpleHeaderNav title="Invite Friends" history={this.props.history} />

          <div className="invite-upper-container">
            <div className="friend-actions-container">

              <div className="inner-container">
                <form id="code-form" onSubmit={this.handleSubmit.bind(this, 'code')}>
                  <input
                    className="invite-input"
                    name="friendCode"
                    placeholder={this.state.codePlaceholder}
                    type="text"
                    value={this.state.friendCode}
                    onFocus={this.handleFocus.bind(this, 'code')}
                    onBlur={this.handleBlur.bind(this, 'code')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className="input-subheader">Ask around</span>
              </div>

              <div className="inner-container">
                <form id="invite-form" onSubmit={this.handleSubmit.bind(this, 'invite')}>
                  <input
                    className="invite-input"
                    name="inviteEmail"
                    placeholder={this.state.emailPlaceholder}
                    type="text"
                    value={this.state.inviteEmail}
                    onFocus={this.handleFocus.bind(this, 'email')}
                    onBlur={this.handleBlur.bind(this, 'email')}
                    onChange={this.handleChange.bind(this)}
                  />
                </form>
                <span className="input-subheader">Invite a friend</span>
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
