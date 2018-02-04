import { authToken } from './auth';

export function fetchTabContent(context, userId=null) {
  return dispatch => {
    switch(context) {
      case 'history':
        dispatch(fetchHistoricalLinkData(userId));
        break
      default:
        dispatch(fetchFriends(context));
    }
  }
}

export function fetchUserProfile(id) {
  return dispatch => {
    dispatch(fetchingUserProfile());
    const url = `https://linkowich-api.herokuapp.com/api/v1/users/${id}`
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
      dispatch(toggleProfileContext("history", id))
    })
    .catch(error => console.log(error))
  }
}

export function fetchFriends(context) {
  return dispatch => {
    dispatch(fetching());
    let url = `https://linkowich-api.herokuapp.com/api/v1/user/${context}`
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
      dispatch(friendsFetched(responseData));
    })
    .catch(error => console.log(error))
  }
}

export function fetchHistoricalLinkData(id) {
  return dispatch => {
    dispatch(fetching());
    const url = `https://linkowich-api.herokuapp.com/api/v1/users/${id}/links`
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

export function toggleProfileContext(context, userId=null) {
  return dispatch => {
    dispatch(updateProfileContext(context));
    dispatch(fetchTabContent(context, userId));
  }
}

export function updateProfileContext(context) {
  return {
    type: 'PROFILE_CONTEXT_TOGGLED',
    data: context
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

export function historicalLinksFetched(data) {
  return {
    type: "HISTORICAL_LINKS_FETCHED",
    data: data
  }
}

export function friendsFetched(data) {
  return {
    type: "FRIENDS_FETCHED",
    data: data
  }
}

export function updateAvatar(fileData) {
  return dispatch => {
    dispatch(submitting());
    return fetch("https://linkowich-api.herokuapp.com/api/v1/user/avatar", {
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

export function updateFollowRelationship(userId, type) {
  return dispatch => {
    let url = `https://linkowich-api.herokuapp.com/api/v1/users/${userId}/follow`
    let method = type === "follow" ? "POST" : "DELETE"
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(userUpdated(responseData.data));
    })
    .catch(error => console.log(error))
  }
}

export function userUpdated(user) {
  return {
    type: "USER_UPDATED",
    data: user
  }
}

export function submitting() {
  return {
    type: "SUBMITTING"
  }
}

export function fetching() {
  return {
    type: "FETCHING_TAB_CONTENT"
  }
}
