const { shell } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import Link from './Link'

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
      <div className="summary js-summary">
        Loading&hellip;
      </div>
    )
  }

  renderLinks(links) {
    let onClick = this.handleLinkClick.bind(this);

    let linkList = links.map(function(link, i) {
      return <Link key={i} data={link} onClick={onClick} />
    });

    return(
      <div> {linkList} </div>
    )
  }

  render() {
    const { links, isFetching } = this.props.feed
    console.log(this.props)

    return(
      <div>
        { isFetching ? this.renderLoadingState() : this.renderLinks(links) }
      </div>
    )
  }
}

export default Feed
