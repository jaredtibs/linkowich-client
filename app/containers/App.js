import React, { Component, PropTypes } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import configureStore from '../store/configure_store';
import styles from '../assets/stylesheets/app.css';

const store = configureStore()

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(store.getState())
    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
