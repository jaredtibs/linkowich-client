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
      <div className="my-link-container">
        <div className="my-link">
          <span className="my-link-url"> { link.attributes.url } </span>
        </div>
      </div>
    )
  }

  renderInputForm() {
    return(
      <form id="link-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group my-link-input-container">
          <input
            className="link-input"
            type="url"
            placeholder="share a link"
            value={this.state.url}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </form>
    )
  }

  render() {
    let { publishingLink, currentLink } = this.props.user;

    return(
      <div className="share-container">

        <div className="input-header">
          <span className="input-label"> My Link </span>
          <span className="link-timestamp"> 2d ago </span>
        </div>

        { currentLink ?
          this.renderMyLink(currentLink) :
          this.renderInputForm()
        }
      </div>
    )
  }
}

export default Share
