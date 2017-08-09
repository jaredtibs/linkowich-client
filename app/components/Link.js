const { shell } = window.require('electron');
import React, { Component, PropTypes } from 'react';

class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const link = this.props.data
    const user = link.attributes.user.data.attributes
    return(
      <div className='link-row padded-horizontally'>
        <img className='img-circle media-object pull-left'
          src='app/assets/default_avatar.jpeg'
          width='32' height='32'
        />
        <div className='username'> {user.username} </div>
        <div className='link-container'>
          <a href="#" onClick={this.props.handleClick()}>
            {link.attributes.url}
          </a>
        </div>
      </div>
    )
  }
}

export default Link
