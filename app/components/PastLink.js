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
      <div className="link-row profile">
        <div className='link-row-header-container'>
          <div className="link-meta-container">
            <div className="meta-text">
              <span className="published-at">{date}</span>
              <span className="time">{time}</span>
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
            <a className={cx({"active": this.state.hovering})} href="#" onClick={() => this.props.onClick(link)}>
              {link.attributes.url}
            </a>
          </div>
        </div>

        <div className="link-footer-container profile">
          <div className="seen-by">
            { seenBy.length > 0 ?
              <span className="seen-by">seen by {seenBy.join(',')}</span>
            : null }
          </div>
        </div>


      </div>
    )
  }
}

export default PastLink;
