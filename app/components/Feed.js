import React, { Component, PropTypes } from 'react';
import Link from './Link'
import Header from './Header'
import Footer from './Footer'

class Feed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchLinks();
  }

  renderLoadingState() {
    return(
      <div className="summary js-summary">
        Loading&hellip;
      </div>
    )
  }

  renderLinks(links) {
    let linkList = links.map(function(link, i){
      return <Link data={link} key={i} />
    })
    return(
      <div> {linkList} </div>
    )
  }

  render() {
    const { links, isFetching } = this.props.feed
    console.log(this.props)

    return(
      <div>
        <div className="header-arrow"></div>
        <div className="window">
          <Header />

          <div className="window-content">
            <div className="pane">
              { isFetching ? this.renderLoadingState() : this.renderLinks(links) }
            </div>
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default Feed
