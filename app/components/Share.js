import React, { Component, PropTypes } from 'react';
import Link from './Link';
import styles from '../assets/stylesheets/share.scss';
import cx from 'classnames';
import SimpleSpinner from './SimpleSpinner';

class Share extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      url: '',
      urlValid: true,
      isEditing: false,
      awaitingClearConfirmation: false,
      shared: false
    }

    this.state = this.defaultState;
    this.mounted = false;
    this.successfulShare = false;
  }

  componentDidMount() {
    this.props.fetchCurrentLink();
    this.mounted = true;
    setTimeout(() => this.mounted = false, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentLink, publishingLink } = this.props.share;
    const prevPublishingLink = prevProps.share.publishingLink;

    if (prevPublishingLink === true && publishingLink === false && currentLink) {
      this.setState({shared: true})
      setTimeout(() => this.setState({shared: false}), 2000)
    }
  }

  handleChange(event) {
    this.setState({url: event.target.value, urlValid: true});
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateUrl(this.state.url) === true) {
      this.props.publishLink(this.state.url)
      this.setState(this.defaultState)
    } else {
      this.setState({urlValid: false});
    }
  }

  handleBlur() {
    this.setState({isEditing: false, awaitingClearConfirmation: false})
  }

  validateUrl(url) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    return regex.test(url)
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
      <div>
        Publishing&hellip;
      </div>
    )
  }

  renderMyLink() {
    const { currentLink, fetchingLink } = this.props.share;
    const displayLink = (currentLink && currentLink.attributes.url)

    return(
      <div className="my-link-container" onClick={this.toggleEditing.bind(this)}>
        <div className="my-link">
          <span className={cx("my-link-url", {
            "flash": this.mounted,
            "bounce": this.state.shared,
            "empty": !displayLink
          })}>
            { displayLink ? this.truncate(currentLink.attributes.url) : "Share some Fire" }
          </span>
        </div>
        <div className={cx("share-border-left",  {"active": false})}></div>
        <div className={cx("share-border-top",   {"active": false})}></div>
        <div className={cx("share-border-right", {"active": false})}></div>
        <div className={cx("share-border-bottom",{"active": false})}></div>
      </div>
    )
  }

  renderInputForm() {
    return(
      <form id="link-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="my-link-input-container">
          <input
            className={cx("link-input", {"error": !this.state.urlValid})}
            placeholder="press enter to share"
            value={this.state.url}
            autoFocus={true}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          <div className={cx("share-edit-border", {"active": this.state.isEditing, "error": !this.state.urlValid})}></div>
        </div>
      </form>
    )
  }

  renderLinkOrEditField() {
    const { publishingLink, currentLink } = this.props.share;

    return(
      <div>
        <div className="share-header">
          <div className="share-header-inner-container left">
            <span className="share-label">My Link</span>
          </div>
          <div className="share-header-inner-container right">
            { !this.state.isEditing ?
              <span className="link-timestamp">
                {currentLink ? `${currentLink.attributes['published-ago']} ago` : null}
              </span>
            : null }
          </div>
        </div>

        { this.state.isEditing || publishingLink ?
          this.renderInputForm() : this.renderMyLink()
        }

        <div className="share-footer">
          { !this.state.urlValid ?
            <div>
              <span className="link-error-msg"> Not a valid url </span>
            </div>
            : null }
          { this.renderClearButton() }
        </div>
      </div>
    )
  }

  renderClearButton() {
    const { currentLink } = this.props.share;

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
    const { fetchingLink } = this.props.share;

    return(
      <div className="share-container">
        { fetchingLink ?
          <div className="share-loading-container">
            <SimpleSpinner
              color1="#b8b8b8"
              color2="#00d5d6"
              color3="#b8b8b8"
              color4="#00d5d6"
            />
          </div>
          : this.renderLinkOrEditField()
        }
      </div>
    )
  }
}

export default Share
