import React, { Component, PropTypes } from 'react';
import ConnectedNav from '../components/NavBar'
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
          <ConnectedNav />
          {this.props.children}
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
