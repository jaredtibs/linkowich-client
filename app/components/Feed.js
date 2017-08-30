const { shell } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import Link from './Link'
import styles from '../feed.css';

class Feed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchLinks();
  }

  handleLinkClick(link) {
    shell.openExternal(link.attributes.url);
  }

  renderLoadingState() {
    return(
      <div className="summary">
        Loading&hellip;
      </div>
    )
  }

  renderFeedContent(links) {
    let onClick = this.handleLinkClick.bind(this);

    if (links.length > 0) {
      let linkList = links.map(function(link, i) {
        return <Link key={i} data={link} onClick={onClick} />
      });

      return(
        <div> {linkList} </div>
      )
    } else {
      return(
        <div className="empty-feed-container">
          <div className="empty-feed-text"> follow people and what they share will appear here </div>
        </div>
      )
    }
  }

  render() {
    const { links, isFetching } = this.props.feed

    return(
      <div className="feed-container">
        <div className="feed-header-container">
          <span className="feed-header"> Friendly Fire </span>
          <span className="add-friends"> add friends </span>
        </div>

        { isFetching ? this.renderLoadingState() : this.renderFeedContent(links) }
      </div>
    )
  }
}

export default Feed
