import { authToken } from './auth';

export function fetchUserProfile(id) {
  return dispatch => {
    dispatch(fetchingUserProfile());
    const url = `http://localhost:3000/api/v1/users/${id}`
    return fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(profileFetched(responseData.data))
      dispatch(fetchHistoricalLinkData(id))
    })
    .catch(error => console.log(error))
  }
}

export function fetchHistoricalLinkData(id) {
  return dispatch => {
    dispatch(fetchingHistoricalLinks());
    const url = `http://localhost:3000/api/v1/users/${id}/links`
    return fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(historicalLinksFetched(responseData.data)))
    .catch(error => console.log(error))
  }
}

export function fetchingUserProfile() {
  return {
    type: "FETCHING_USER_PROFILE"
  }
}

export function profileFetched(data) {
  return {
    type: "PROFILE_FETCHED",
    data: data.attributes
  }
}

export function fetchingHistoricalLinks() {
  return {
    type: "FETCHING_HISTORICAL_LINKS"
  }
}

export function historicalLinksFetched(data) {
  return {
    type: "HISTORICAL_LINKS_FETCHED",
    data: data
  }
}

export function updateAvatar(fileData) {
  return dispatch => {
    dispatch(submitting());
    return fetch("http://localhost:3000/api/v1/user/avatar", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
      body: JSON.stringify({
        file: fileData
      })
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(userAvatarUpdated(responseData)))
    .catch(error => console.error(error))
  }
}

export function userAvatarUpdated(data) {
  const avatar = data.data.attributes.avatar;
  return {
    type: "AVATAR_UPDATED",
    avatar: avatar
  }
}

export function submitting() {
  return {
    type: "SUBMITTING"
  }
}

