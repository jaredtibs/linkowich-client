import React, { Component, PropTypes } from 'react';
import ConnectedHeader from '../components/Header'
import Footer from '../components/Footer'
import styles from '../assets/stylesheets/app.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <ConnectedHeader />
          {this.props.children}
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
