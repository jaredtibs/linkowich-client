import { authToken } from './auth';
import { push } from 'react-router-redux';

export function fetchInvitations() {
  return dispatch => {
    dispatch(fetchingInvitations());
    return fetch('http://localhost:3000/api/v1/invitations', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(invitationsFetched(responseData)))
    .catch(error => console.log(error))
  }
}

export function fetchingInvitations() {
  return {
    type: "FETCHING_INVITATIONS"
  }
}

export function invitationsFetched(data) {
  return {
    type: "INVITATIONS_FETCHED",
    data: data
  }
}

export function acceptInvite(inviteId) {
  return dispatch => {
    let url = `http://localhost:3000/api/v1/invitations/${inviteId}/accept`
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
      dispatch(inviteAccepted());
    })
    .catch(error => console.log(error))
  }
}

export function inviteAccepted() {
  return dispatch => {
    dispatch(push("/home"));
  }
}
