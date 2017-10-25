import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/link.scss';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

const defaultAvatar = require("../assets/images/default_avatar_blue.svg")

class FeedLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
      copied: false
    }
    this.copiedDone = this.copiedDone.bind(this)
  }

  _handleParentHover() {
    this.setState({copied: false})
  }

  _handleHover() {
    this.setState({hovering: !this.state.hovering})
  }

  componentDidMount () {
    const elm = this.copyButton
    elm.addEventListener('animationend', this.copiedDone)
  }

  componentWillUnmount () {
    const elm = this.copyButton
    elm.removeEventListener('animationend', this.copiedDone)
  }

  copiedDone () {
    this.setState({copied: false})
  }

  renderSeenBy(names) {
    const displayed = names.slice(0, 2);
    const rest = names.slice(1, -1);

    let text = "seen by " + displayed.join(', ');
    if (rest.length > 0) {
      let otherText = rest.length === 1 ? "other" : "others"
      text += " & " + rest.length + " " + otherText;
    }

    return(
      <span>{text}</span>
    )
  }

  render() {
    const link = this.props.data;
    const seenBy = link.attributes['seen-by'];
    const votedFor = link.attributes['voted-for'];
    const user = link.attributes.user.data;
    const userAttributes = user.attributes;
    const { avatar, username } = userAttributes;
    const avatar_src = avatar.url ? avatar.url : defaultAvatar;

    return(
      <div className='link-row'
           onMouseOut={this._handleParentHover.bind(this)}
      >
        <div className='link-row-header-container'>

          <div className="link-meta-container">
            <Link to={`/user/${user.id}`}>
              <div className="avatar">
                <img src={avatar_src} width={30} height={30} />
              </div>
            </Link>
            <div className="meta-text">
              <Link to={`/user/${user.id}`} className="username-link">
                <span className="username">{username}</span>
              </Link>
              <span className="published-ago">{link.attributes['published-ago']} ago</span>
            </div>
          </div>

          <div className="link-vote-container" onClick={() => {
                if (!votedFor) {
                  this.props.vote(link.id, 'upvote')
                } else {
                  this.props.vote(link.id, 'unvote')
                }
          }}>

            { link.attributes['upvote-count'] > 0 ?
              <span className={cx("vote-count", {"voted": votedFor})}>+{link.attributes['upvote-count']}</span>
            : null }
            <i className={cx("material-icons vote-icon", {"voted": votedFor})}>whatshot</i>
          </div>
        </div>

        <div className='link-container'
             onMouseOver={this._handleHover.bind(this)}
             onMouseOut={this._handleHover.bind(this)}>
          <div className="url-text-container">
            <a href="#" className={cx({"active": this.state.hovering})} onClick={() => this.props.onClick(link)}>
              {link.attributes.url}
            </a>
          </div>
        </div>


        <div className="link-footer-container">
          <div className="seen-by">
            { seenBy.length > 0 ? this.renderSeenBy(seenBy) : null }
          </div>
          <div className={cx("action-btns-container", {"hidden": !this.state.hovering})}
               onMouseOver={this._handleHover.bind(this)}
               onMouseOut={this._handleHover.bind(this)}>
            <CopyToClipboard
              text={link.attributes.url}
              onCopy={() => this.setState({copied: true})}>
              <div className={cx("link-action-btn", {"copied": this.state.copied})}
                   ref={(copyButton) => {this.copyButton = copyButton}}>
                <i className="material-icons">link</i>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedLink;
