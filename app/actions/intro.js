import { authToken } from './auth';

export function fetchInvitations() {
  return dispatch => {
    dispatch(fetchingLinks());
    return fetch('http://localhost:3000/api/v1/links', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(linksFetched(responseData)))
    .catch(error => console.log(error))
  }
}
