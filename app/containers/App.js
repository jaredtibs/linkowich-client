import React, { Component, PropTypes } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {logout} from '../actions/user';
import configureStore from '../store/configure_store';

const store = configureStore()

class App extends Component {
  constructor(props) {
    super(props)
  }

  _logoutUser() {
    store.dispatch(logout());
  }

  render() {
    return(
      <div>
        <div className="header-arrow"></div>

        <div className="window">
          <Header />
          {this.props.children}
          <Footer logout={this._logoutUser} />
        </div>

      </div>
    )
  }
}

export default App;
