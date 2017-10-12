const { shell } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import FeedLink from './Link'
import { Link } from 'react-router-dom'
import styles from '../assets/stylesheets/feed.scss'
import ListLoader from './ListLoader';

class Feed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchLinks();
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
    this.props.markLinkSeen(link.id)
  }

  vote(postId, type) {
    this.props.castVote(postId, type)
  }

  renderFeedContent(links) {
    const onClick = this.handleLinkClick.bind(this);
    const vote = this.vote.bind(this);

    if (links.length > 0) {
      const linkList = links.map(function(link, i) {
        return <FeedLink key={i} data={link} onClick={onClick} vote={vote} />
      });

      return(
        <div> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-feed">
          <div className="empty-text">Add friends to populate your feed!</div>
        </div>
      )
    }
  }

  render() {
    const { links, isFetching } = this.props.feed;

    return(
      <div className="feed-container">
        <div className="feed-header-container">
          <span className="feed-header"> Friendly Fire </span>
          <Link to={'/friends'} className="add-friends-link">
            <span className="add-friends"> + Add Friends </span>
          </Link>
        </div>

        { isFetching ? <ListLoader /> : this.renderFeedContent(links) }
      </div>
    )
  }
}

export default Feed
