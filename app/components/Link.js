const { shell } = window.require('electron');
import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.css';
import { Emoji } from 'emoji-mart';

class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const link = this.props.data
    const user = link.attributes.user.data.attributes

    return(
      <div className='link-row'>
        <div className='link-row-header-container'>
          <div>
            <span className='username'>{user.username}</span>
            <span className='link-timestamp'>1h ago</span>
          </div>

          <div>
            <span className='link-history'> + 3 links </span>
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
          <span className="seen-by"> seen by JaredTibs, SeanCrebbs, Gambrumbumm </span>
        </div>
      </div>
    )
  }
}

export default Link
