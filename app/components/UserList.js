import React, { Component } from 'react';
//TODO install and change import on all components + add checking
//import PropTypes from 'prop-types'

class UserList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let { users } = this.props;

    if (users.length > 0) {
      return(
        users.map((user, index) => (
          <div key={item.id}> </div>
        ))
      )
    } else {
      return(
        <div> you're not following anyone </div>
      )
    }
  }
}

export default UserList;
