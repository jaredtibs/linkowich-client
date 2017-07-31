import React, { Component, PropTypes } from 'react';
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import FeedContainer from './FeedContainer'
import LoginContainer from './LoginContainer'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Router>
        <Route path='/' component={FeedContainer} />
      </Router>
    )
  }
}

export default App;
