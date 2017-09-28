import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import defaultAvatar from "../assets/default_avatar.jpeg"
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
      copied: false,
      voted: false
    }
  }

  _handleParentHover() {
    this.setState({copied: false})
  }

  _handleHover() {
    this.setState({hovering: !this.state.hovering})
  }

  render() {
    const link = this.props.data
    const seenBy = link.attributes['seen-by']
    const user = link.attributes.user.data.attributes
    const { avatar, username } = user;
    const avatar_src = avatar.url ? avatar.url : defaultAvatar;

    return(
      <div className='link-row'
           onMouseOut={this._handleParentHover.bind(this)}
      >
        <div className='link-row-header-container'>

          <div className="link-meta-container">
            <div className="avatar">
              <img src={avatar_src} width={30} height={30} />
            </div>
            <div className="meta-text">
              <span className='username'>{username}</span>
              <span className='timestamp'>{link.attributes['published-at']} ago</span>
            </div>
          </div>

          <div className="link-vote-container">
            <i className="material-icons vote-icon">whatshot</i>
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
            { seenBy.length > 0 ?
              <span className="seen-by">seen by {seenBy.join(',')}</span>
            : null }
          </div>
          <div className={cx("action-btns-container", {"hidden": !this.state.hovering})}
               onMouseOver={this._handleHover.bind(this)}
               onMouseOut={this._handleHover.bind(this)}>
            <CopyToClipboard
              text={link.attributes.url}
              onCopy={() => this.setState({copied: true})}>
              <div className={cx("link-action-btn")}>
                <i className="material-icons">link</i>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}

export default Link
