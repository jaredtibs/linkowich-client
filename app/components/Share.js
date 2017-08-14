import React, { Component, PropTypes } from 'react';
import Link from './Link'

class Share extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    this.props.fetchCurrentLink();
  }

  handleChange(event) {
    this.setState({url: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.publishLink(this.state.url)
    this.setState({url: ''})
  }

  renderLoadingState() {
    return(
      <div className="summary">
        Publishing&hellip;
      </div>
    )
  }

  renderMyLink(link) {
    return(
      <div className="my-link">
        <span> My link </span>
        <a href="#"> {link.attributes.url}</a>
      </div>
    )
  }

  render() {
    let { publishingLink, currentLink } = this.props.user;

    return(
      <div className="share-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input
              type="url"
              placeholder="publish a link"
              value={this.state.url}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-form btn-primary"> Publish </button>
          </div>
        </form>

        { publishingLink ? this.renderLoadingState() : null }
        { currentLink ? this.renderMyLink(currentLink) : null }
      </div>
    )
  }
}

export default Share
