import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/in_app_notification.scss';
import cx from 'classnames';
const notificationIcon = require('../assets/images/notification_icon.svg');

class InAppNotification extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      dismiss: false,
      show: false
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    this.notification.addEventListener('animationend', this.handleAnimationEnd.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show == false && this.props.show == true) {
      this.setState(this.defaultState);
      this.setState({show: true});
    }
  }

  componentWillUnmount() {
    this.notification.removeEventListener('animationend', this.handleAnimationEnd.bind(this));
  }

  handleAnimationEnd(event) {
    if (event.animationName == 'showNotification') {
      setTimeout(() => this.setState({dismiss: true}), 2000);
    }
  }

  render() {
    return(
      <div
        ref={(notification) => { this.notification = notification; }}
        className={cx("notification-container", {
          "show": this.state.show,
          "dismiss": this.state.dismiss
        })}>

        <div className="icon-container">
          <img src={notificationIcon} width={19} height={22} />
        </div>
        <div className="msg-container">
          <span className="msg-text">{this.props.msg}</span>
        </div>

      </div>
    )
  }
}

export default InAppNotification;
