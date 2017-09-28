import React, { Component, PropTypes } from 'react';
import Link from './Link';
import styles from '../assets/stylesheets/share.scss';

class Share extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      url: '',
      isEditing: false,
      awaitingClearConfirmation: false
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    this.props.fetchCurrentLink();
  }

  handleChange(event) {
    this.setState({url: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.publishLink(this.state.url)
    this.setState(this.defaultState)
  }

  handleBlur() {
    this.setState({isEditing: false, awaitingClearConfirmation: false})
  }

  toggleEditing() {
    this.setState({isEditing: true})
  }

  clearLink() {
    this.promptConfirmation();
  }

  promptConfirmation() {
    this.setState({awaitingClearConfirmation: true})
  }

  truncate(url) {
    if (url.length <= 40) { return url };
    return url.slice(0, 40) + ' ...';
  }

  renderLoadingState() {
    return(
      <div className="summary">
        Publishing&hellip;
      </div>
    )
  }

  renderMyLink() {
    const { currentLink, fetchingLink } = this.props.share;
    const displayLink = (currentLink && currentLink.attributes.url) && !fetchingLink

    return(
      <div className="my-link-container" onClick={this.toggleEditing.bind(this)}>
        <div className="my-link">
          { displayLink ?
            <span className="my-link-url"> { this.truncate(currentLink.attributes.url) } </span>
          : <span className="my-link-url"> share some fire </span>
          }
        </div>
      </div>
    )
  }

  renderInputForm() {
    return(
      <form id="link-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="my-link-input-container">
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

  renderClearButton() {
    let { currentLink } = this.props.share;

    if (currentLink && !this.state.isEditing) {
      if (this.state.awaitingClearConfirmation) {
        return(
          <div className="clear-link-confirmation">
            <div>Are you sure? </div>
            <div className="clear-yes"
              onClick={() => this.props.clearLink()}
            >
              yes
            </div>
            <div className="clear-no"
              onClick={() => this.setState({awaitingClearConfirmation: false})}>
              no
            </div>
          </div>
        )
      } else {
        return(
          <div className="clear-link" onClick={this.promptConfirmation.bind(this)}>
            clear link
          </div>
        )
      }
    } else {
      return null;
    }
  }

  render() {
    let { fetchingLink, currentLink } = this.props.share;

    return(
      <div className="share-container">

        <div className="share-header">
          <span className="share-label">My Link</span>
          { !this.state.isEditing ?
            <span className="link-timestamp">
              {currentLink ? `${currentLink.attributes['published-at']} ago` : null}
            </span>
          : null }
        </div>

        { this.renderLinkOrEditField() }

        <div className="share-footer">
          { this.renderClearButton() }
        </div>
      </div>
    )
  }
}

export default Share
