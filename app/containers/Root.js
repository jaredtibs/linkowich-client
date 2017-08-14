import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import {fetchUserSession} from '../actions/user';
import App from './App'
import HomeContainer from './HomeContainer'
import LoginContainer from './LoginContainer'

class Root extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //localStorage.removeItem('userToken')
  }

  authenticated() {
    let token = localStorage.getItem('userToken');
    let store = this.props.store;

    if (token !== null){
      store.dispatch(fetchUserSession());
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>

          <App>
            <Switch>
              <Route exact path="/" render={() => (
                localStorage.getItem('userToken') ? (
                  <Redirect to="/home"/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path='/login' component={LoginContainer} onEnter={this.authenticated()} />
              <Route path='/home'  component={HomeContainer} onEnter={this.authenticated()} />
            </Switch>
          </App>

        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
