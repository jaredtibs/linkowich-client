import React, { Component, PropTypes } from 'react';

import PublishContainer from '../containers/PublishContainer'
import FeedContainer from '../containers/FeedContainer'


class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="window-content">
        <div className="pane">
          <PublishContainer />
          <FeedContainer />
        </div>
      </div>
    )
  }
}

export default Home;
