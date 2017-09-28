import { authToken } from './auth';

export function fetchFriends(context) {
  return dispatch => {
    dispatch(isFetching());
    let url = `http://localhost:3000/api/v1/user/${context}`
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

export function isFetching() {
  return {
    type: "FETCHING_FRIENDS"
  }
}

export function friendsFetched(data) {
  return {
    type: "FRIENDS_FETCHED",
    data: data
  }
}

export function toggleFollowContext(context) {
  return dispatch => {
    dispatch(changeFollowContext(context));
    dispatch(fetchFriends(context));
  }
}

export function changeFollowContext(context) {
  return {
    type: 'FOLLOW_CONTEXT_TOGGLED',
    data: context
  }
}

export function addFriendByCode(code, context) {
  return dispatch => {
    dispatch(isSubmitting());
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
      dispatch(fetchFriends(context));
    })
    .catch(error => console.log(error))
  }
}

export function isSubmitting() {
  return {
    type: 'SUBMITTING'
  }
}

export function friendAdded() {
  return {
    type: 'FRIEND_ADDED',
  }
}

export function followUser(userId) {
  return dispatch => {
    let url = `http://localhost:3000/api/v1/users/${userId}/follow`
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
      dispatch(userUpdated(responseData.data));
    })
    .catch(error => console.log(error))
  }
}

export function unfollowUser(userId) {
  return dispatch => {
    let url = `http://localhost:3000/api/v1/users/${userId}/follow`
    return fetch(url, {
      method: "DELETE",
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
