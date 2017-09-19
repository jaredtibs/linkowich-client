import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import { Emoji } from 'emoji-mart';

class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const link = this.props.data
    const seenBy = link.attributes['seen-by']
    const user = link.attributes.user.data.attributes

    return(
      <div className='link-row'>
        <div className='link-row-header-container'>
          <div>
            <span className='username'>{user.username}</span>
            <span className='link-timestamp'>{link.attributes['published-at']} ago</span>
          </div>

          <div>
            { user['link-count'] > 1 ?
              <span className='link-history'>+ {user['link-count'] - 1} links</span>
              : null }
          </div>
        </div>

        <div className='link-container'>
          <div className="emoji-container">
            <Emoji emoji=':stuck_out_tongue_winking_eye:' size={24} />
          </div>

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
