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
        <Switch>
          <Route exact path="/" render={() => (
            false ? (
              <Redirect to="/feed"/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path='/login' component={LoginContainer} />
          <Route path='/feed' component={FeedContainer} />
        </Switch>
      </Router>
    )
  }
}

export default App;
