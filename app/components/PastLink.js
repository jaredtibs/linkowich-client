import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import { Emoji } from 'emoji-mart';

class PastLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const link = this.props.data
    const user = link.attributes.user.data.attributes

    return(
      <div className='link-row'>
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

        <div className="past-link-footer-container">
          <span className="seen-by">seen by JaredTibs, SeanCrebbs</span>
          <span className='link-timestamp'>{link.attributes['published-at']} ago</span>
        </div>
      </div>
    )
  }
}

export default PastLink
