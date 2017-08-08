import React, { Component, PropTypes } from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from '../store/configure_store';
const store = configureStore();

import { fetchUserSession } from '../actions/user';

import FeedContainer from './FeedContainer';
import LoginContainer from './LoginContainer';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // localStorage.removeItem('userToken')
  }

  authenticated() {
    let token = localStorage.getItem('userToken');
    if (token !== null){
      store.dispatch(fetchUserSession(token))
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => (
            this.authenticated() ? (
              <Redirect to="/feed" />
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path='/login' component={LoginContainer} />
          <Route path='/feed' component={FeedContainer} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

export default App;
