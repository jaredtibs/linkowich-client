import { authToken } from './auth';

export function addFriendByCode(code) {
  return dispatch => {
    dispatch(submitting());
    let url = `https://linkowich-api.herokuapp.com/api/v1/user/follow/${code}`
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
  return dispatch => {
    dispatch(submitting());
    return fetch("https://linkowich-api.herokuapp.com/api/v1/invitations", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(inviteSent());
    })
    .catch(error => console.log(error))
  }
}

export function inviteSent() {
  return {
    type: 'INVITE_SENT'
  }
}

export function submitting() {
  return {
    type: "SUBMITTING"
  }
}
