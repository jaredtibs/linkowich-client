import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../assets/stylesheets/app.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  hasHeader(location) {
    switch(location) {
      case '/home':
      case '/profile':
      case '/settings':
        return true;
      default:
        return false;
    }
  }

  render() {
    let { location } = this.props.router;

    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          { this.hasHeader(location.pathname) ? <Header /> : null}
          {this.props.children}
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App);
