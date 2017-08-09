import React, { Component, PropTypes } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
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
