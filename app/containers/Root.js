import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import {fetchUserSession}       from '../actions/user';
import App                      from './App';
import Landing                  from './Landing';
import HomeContainer            from './HomeContainer';
import ProfileContainer         from './ProfileContainer';
import SettingsContainer        from './SettingsContainer';
import FriendsContainer         from './FriendsContainer';
import IntroContainer           from './IntroContainer';
import InvitationIntro          from '../components/InvitationIntro';

import styles from '../assets/stylesheets/animations.scss';

class Root extends Component {
  constructor(props) {
    super(props)
  }

  authenticated() {
    const token = localStorage.getItem('userToken');
    const store = this.props.store;

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
                  <Redirect to="/landing"/>
                )
              )}/>
              <Route path='/landing' component={Landing} />
              <Route path='/intro' component={IntroContainer} onEnter={this.authenticated()} />
              <Route path='/invitation-intro' component={InvitationIntro} onEnter={this.authenticated()} />
              <Route path='/home' component={HomeContainer} onEnter={this.authenticated()} />
              <Route path='/user/:id' component={ProfileContainer} onEnter={this.authenticated()} />
              <Route path='/settings' component={SettingsContainer} onEnter={this.authenticated()} />
              <Route path='/friends' component={FriendsContainer} onEnter={this.authenticated()} />
            </Switch>
          </App>

        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
