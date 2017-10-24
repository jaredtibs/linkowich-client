export function addFriendByCode(code) {
  return dispatch => {
    dispatch(submitting());
    let url = `http://localhost:3000/api/v1/user/follow/${code}`
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(friendAdded());
    })
    .catch(error => console.log(error))
  }
}

export function friendAdded() {
  return {
    type: 'FRIEND_ADDED',
  }
}

export function inviteUser(email) {
}

export function userInvited() {
  return {
    type: 'USER_INVITED'
  }
}

export function submitting() {
  return {
    type: "SUBMITTING"
  }
}
