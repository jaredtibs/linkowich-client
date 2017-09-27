import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import defaultAvatar from "../assets/default_avatar.jpeg"

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false
    }
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
    console.log(this.state)

    return(
      <div className='link-row'>
        <div className='link-row-header-container'>

          <div className="link-meta-container">
            <div className="avatar">
              <img src={avatar_src} width={30} height={30} />
            </div>
            <div>
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
            <a href="#" onClick={() => this.props.onClick(link)}>
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
          { this.state.hovering ?
            <div className="action-btns-container">
              <div className="link-action-btn">
                <i className="material-icons">whatshot</i>
              </div>
              <div className="link-action-btn">
                <i className="material-icons">link</i>
              </div>
            </div>
          : null }
        </div>

      </div>
    )
  }
}

export default Link
