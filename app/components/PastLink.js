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

  renderSeenBy(names) {
    const displayed = names.slice(0, 1);
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

  renderVoteContent(link) {
    const { mine } = this.props;
    const votedFor = link.attributes['voted-for'];

    if (!mine) {
      return(
        <div className="link-vote-container" onClick={() => {
                if (!votedFor) {
                  this.props.vote(link.id, 'upvote', 'profile')
                } else {
                  this.props.vote(link.id, 'unvote', 'profile')
                }
          }}>
            { link.attributes['upvote-count'] > 0 ?
              <span className={cx("vote-count", {"voted": votedFor})}>+{link.attributes['upvote-count']}</span>
            : null }
            <i className={cx("material-icons vote-icon profile", {"voted": votedFor})}>whatshot</i>
          </div>
      )
    } else if (link.attributes['upvote-count'] > 0) {
        return(
          <div className="link-vote-container past-link">
            <span className="past-vote-count">+{link.attributes['upvote-count']}</span>
            <i className="material-icons past-vote-icon">whatshot</i>
          </div>
        )
    } else {
      return null;
    }
  }

  render() {
    const link = this.props.data;
    const seenBy = link.attributes['seen-by'];
    const user = link.attributes.user.data.attributes;
    const publishedAt = link.attributes['published-at'];
    const date = publishedAt.split('|')[0];
    const time = publishedAt.split('|')[1];
    const hasFooterData = seenBy.length > 0 || link.attributes.current;

    return(
      <div className={cx("link-row profile", {"with-footer": hasFooterData})}>
        <div className='link-row-header-container'>
          <div className="link-meta-container profile">
            <div className="meta-text">
              <span className="published-at">{date}</span>
              <span className="time">{time}</span>
            </div>
          </div>
          {this.renderVoteContent(link)}
        </div>

        <div className={cx("link-container", {"current": link.attributes.current})}
             onMouseOver={this._handleHover.bind(this)}
             onMouseOut={this._handleHover.bind(this)}>
          <div className="url-text-container">
            <a className={cx("past", {"active": this.state.hovering})} href="#" onClick={() => this.props.onClick(link)}>
              {link.attributes.url}
            </a>
          </div>
        </div>

        <div className="link-footer-container profile">
            <div className="seen-by">
              { seenBy.length > 0 ?
                this.renderSeenBy(seenBy)
              : null }
            </div>

            <div className="past-link-current">
              { link.attributes.current ?
                <span>current</span>
              : null }
            </div>
        </div>


      </div>
    )
  }
}

export default PastLink;
