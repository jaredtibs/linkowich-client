import React, { Component, PropTypes } from 'react';
import ShareContainer from '../containers/ShareContainer'
import FeedContainer from '../containers/FeedContainer'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <ShareContainer />
          <FeedContainer />
        </div>
      </div>
    )
  }
}

export default Home;
