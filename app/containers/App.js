import React, { Component, PropTypes } from 'react';
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Feed from '../components/Feed'

class App extends Component {
  constructor(props) {
    super(props)
  }

  //TODO set up routing here
  render() {
    return(
      <Router>
        <Route path='/' component={Feed} />
      </Router>
    )
  }
}

export default App;
