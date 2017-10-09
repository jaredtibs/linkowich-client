import React, { Component, PropTypes } from 'react';
import Link from './Link';
import styles from '../assets/stylesheets/share.scss';
import cx from 'classnames';

class Share extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      url: '',
      isEditing: false,
      awaitingClearConfirmation: false,
      shareSuccess: false,
      mounted: false
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    this.setState({mounted: true})
    this.props.fetchCurrentLink();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentLink, publishingLink } = this.props.share;
    const prevPublishingLink = prevProps.share.publishingLink;

    if (publishingLink === false && prevPublishingLink === true && currentLink) {
      this.setState({ shareSuccess: true });
    }

    //if (prevProps.share.currentLink === null && currentLink !== null) {
    //  this.setState({ mounted: null })
    //}
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
      <div>
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
          <span className={cx("my-link-url", {"bounce": this.state.shareSuccess, "empty": !displayLink})}>
            { displayLink ? this.truncate(currentLink.attributes.url) : "Share some Fire" }
          </span>
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
          <div className={cx("share-edit-border", {"active": this.state.isEditing})}></div>
        </div>
      </form>
    )
  }

  renderLinkOrEditField() {
    if (this.state.isEditing || this.state.isPublishing) {
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
    let {
      fetchingLink,
      publishingLink,
      currentLink } = this.props.share;

    return(
      <div className={cx("share-container", {"mounted": this.state.mounted})}>

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

        { !fetchingLink ?
          this.renderLinkOrEditField()
          : null }

        <div className="share-footer">
          { this.renderClearButton() }
        </div>
      </div>
    )
  }
}

export default Share

/*
//TODO share checkmark success fade in - TBD
 *
<span className={cx("share-outcome", {"success": this.state.shareSuccess})}>
  <i className="material-icons success-icon">check_circle</i>
</span>
.share-outcome {
  cursor: default;
  padding-left: 5px;
  margin-top: 2px;
  opacity: 1;
}

.share-outcome.success {
  animation: fadeInSuccess;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-delay: 0.5s;
}

@keyframes fadeInSuccess {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.success-icon {
  font-size: 13px !important;
  color: green;
}


*/

