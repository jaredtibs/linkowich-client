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
      let userList = users.map((user, index) => {
        return(
          <div key={user.id} className="user-row">
            <div className="user-avatar"> avatar </div>
            <div className="user-username"> {user.attributes.username} </div>
          </div>
        )
      })

      return(
        <div> {userList} </div>
      )
    } else {
      return(
        <div> you're not following anyone </div>
      )
    }
  }
}

export default UserList;
