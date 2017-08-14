import React, { Component, PropTypes } from 'react';

class Publish extends Component {
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
    this.props.publishLink(this.state.url);
  }

  renderLoadingState() {
    return(
      <div className="summary">
        Publishing&hellip;
      </div>
    )
  }

  render() {
    let { publishingLink } = this.props.user;
    let { currentLink } = this.props.user
    console.log(this.props);

    return(
      <div className="publish-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input
              type="url"
              name="url"
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
      </div>
    )
  }
}

export default Publish
