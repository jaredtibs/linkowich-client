import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './App'
import FeedContainer from './FeedContainer'
import LoginContainer from './LoginContainer'

class Root extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //localStorage.removeItem('userToken')
  }

  authenticated() {
    let token = localStorage.getItem('userToken')
    if (token !== null){
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <Router>

          <App>
            <Switch>
              <Route exact path="/" render={() => (
                this.authenticated() ? (
                  <Redirect to="/feed"/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path='/login' component={LoginContainer} />
              <Route path='/feed' component={FeedContainer} />
            </Switch>
          </App>

        </Router>
      </Provider>
    )
  }
}

export default Root
