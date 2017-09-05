import React, { Component, PropTypes } from 'react';
import Link from './Link';
import styles from '../assets/stylesheets/share.css';

class Share extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      isEditing: false
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
    this.setState({url: '', isEditing: false})
  }

  handleBlur() {
    this.setState({isEditing: false})
  }

  toggleEditing() {
    this.setState({isEditing: true})
  }

  renderLoadingState() {
    return(
      <div className="summary">
        Publishing&hellip;
      </div>
    )
  }

  renderMyLink() {
    let { currentLink, fetchingLink } = this.props.user;
    let displayLink = (currentLink && currentLink.attributes.url) && !fetchingLink

    return(
      <div className="my-link-container" onClick={this.toggleEditing.bind(this)}>
        <div className="my-link">
          { displayLink ?
            <span className="my-link-url"> { currentLink.attributes.url } </span>
          : <span className="my-link-url"> nothing published. click to share a link... </span>
          }
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
            placeholder="press enter to share"
            value={this.state.url}
            autoFocus={true}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
        </div>
      </form>
    )
  }

  renderLinkOrEditField() {
    if (this.state.isEditing) {
      return this.renderInputForm()
    } else {
      return this.renderMyLink()
    }
  }

  render() {
    let { fetchingLink, currentLink } = this.props.user;

    return(
      <div className="share-container">

          <div className="input-header">
            <span className="input-label">My Link</span>
            <span className="link-timestamp">
              {currentLink ? `${currentLink.attributes['published-at']} ago` : null}
            </span>
          </div>

        { this.renderLinkOrEditField() }
      </div>
    )
  }
}

export default Share
