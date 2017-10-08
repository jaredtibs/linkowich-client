import React, { Component, PropTypes } from 'react';
import styles from '../assets/stylesheets/link.scss';
import cx from 'classnames';

class PastLink extends Component {
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
    const link = this.props.data;
    const seenBy = link.attributes['seen-by'];
    const user = link.attributes.user.data.attributes;
    const publishedAt = link.attributes['published-at'];
    const date = publishedAt.split('|')[0];
    const time = publishedAt.split('|')[1];

    return(
      <div className={cx("link-row profile", {"with-footer": seenBy.length > 0})}>
        <div className='link-row-header-container'>
          <div className="link-meta-container profile">
            <div className="meta-text">
              <span className="published-at">{date}</span>
              <span className="time">{time}</span>
            </div>
          </div>
          { link.attributes['upvote-count'] > 0 ?
            <div className="link-vote-container past-link">
              <span className="past-vote-count">+{link.attributes['upvote-count']}</span>
              <i className="material-icons past-vote-icon">whatshot</i>
            </div>
            : null }
        </div>

        <div className='link-container'
             onMouseOver={this._handleHover.bind(this)}
             onMouseOut={this._handleHover.bind(this)}>
          <div className="url-text-container">
            <a className={cx("past", {"active": this.state.hovering})} href="#" onClick={() => this.props.onClick(link)}>
              {link.attributes.url}
            </a>
          </div>
        </div>

        <div className="link-footer-container profile">
          { seenBy.length > 0 ?
            <div className="seen-by">
                <span className="seen-by">seen by {seenBy.join(', ')}</span>
            </div>
          : null }
        </div>


      </div>
    )
  }
}

export default PastLink;
