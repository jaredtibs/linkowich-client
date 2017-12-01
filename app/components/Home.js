const { ipcRenderer } = window.require('electron');

import React, { Component, PropTypes } from 'react';
import ShareContainer from '../containers/ShareContainer'
import FeedContainer from '../containers/FeedContainer'
import Pusher from 'pusher-js';

class Home extends Component {
  constructor(props) {
    super(props)

    this.handleLinkPublished = this.handleLinkPublished.bind(this);
  }

  componentWillMount() {
    this.pusher = new Pusher("a138d00997c28c8aad6b", {
      cluster: "us2",
      encrypted: true
    });

    this.channel = this.pusher.subscribe('links');
  }

  componentDidMount() {
    this.channel.bind('link-published', this.handleLinkPublished);
  }

  componentWillUnmount() {
    this.channel.unbind();
    this.pusher.unsubscribe(this.channel);
  }

  handleLinkPublished(data) {
    const { message } = data;
    const { followingIds } = this.props.user;

    if ( followingIds.includes(message['user_id']) ) {
      ipcRenderer.send('links-updated');
    }
  }

  render() {
    const { user } = this.props;
    return(
      <div className="window-content">
        <div className="home-container">
          { user && user.loggedIn ?
            <div>
              <ShareContainer />
              <FeedContainer />
            </div>
          :
            null
          }
        </div>
      </div>
    )
  }
}

export default Home;
