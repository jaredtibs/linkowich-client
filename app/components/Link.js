import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import defaultAvatar from "../assets/default_avatar.jpeg"

class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const link = this.props.data
    const seenBy = link.attributes['seen-by']
    const user = link.attributes.user.data.attributes
    const { avatar, username } = user;
    const avatar_src = avatar.url ? avatar.url : defaultAvatar;

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

        <div className='link-container'>

          <div className="url-text-container">
            <a href="#" onClick={() => this.props.onClick(link)}>
              {link.attributes.url}
            </a>
          </div>
        </div>

        <div className="link-stats-container">
          { seenBy.length > 0 ?
            <span className="seen-by">seen by {seenBy.join(',')}</span>
          : null }
        </div>
      </div>
    )
  }
}

export default Link
