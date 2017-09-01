import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import {fetchUserSession} from '../actions/user';
import App from './App'
import LoginContainer from './LoginContainer'
import SignUpContainer from './SignUpContainer'
import HomeContainer from './HomeContainer'
import ProfileContainer from './ProfileContainer'
import SettingsContainer from './SettingsContainer'

import styles from '../assets/stylesheets/animations.css';

class Root extends Component {
  constructor(props) {
    super(props)
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
                  <Redirect to="/signup"/>
                )
              )}/>
              <Route path='/signup' component={SignUpContainer} />
              <Route path='/login' component={LoginContainer} />
              <Route path='/home' component={HomeContainer} onEnter={this.authenticated()} />
              <Route path='/profile' component={ProfileContainer} onEnter={this.authenticated()} />
              <Route path='/settings' component={SettingsContainer} onEnter={this.authenticated()} />
            </Switch>
          </App>

        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
