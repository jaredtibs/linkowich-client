import { push, replace } from 'react-router-redux';
import { authToken } from './auth';

export function requestLogin (email, password) {
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.errors) {
        dispatch(handleError(responseData.errors))
      } else {
        dispatch(finishLogin(responseData))
      }
    })
    .catch(error => console.log(error))
  }
}

export function finishLogin(sessionData) {
  return dispatch => {
    dispatch(receiveSession(sessionData));
    dispatch(push("/home"));
  }
}

export function register (email, username, password) {
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/registrations", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.errors) {
        dispatch(handleError(responseData.errors))
      } else {
        dispatch(finishRegister(responseData))
      }
    })
    .catch(error => console.log(error))
  }
}

export function finishRegister(sessionData) {
  return dispatch => {
    dispatch(receiveSession(sessionData));
    dispatch(push("/intro"));
  }
}

export function receiveSession(sessionData) {
  localStorage.setItem('userToken', sessionData.token);

  return {
    type: "LOGGED_IN",
    data: sessionData.user.data.attributes
  }
}

export function handleError(errors) {
  return {
    type: "LOGIN_ERROR",
    errors: errors
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('userToken');
    dispatch(replace("/login"))
    return {
      type: "LOGGED_OUT"
    }
  }
}

export function loading() {
  return {
    type: "LOADING"
  }
}

export function fetchUserSession() {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(sessionFetched(responseData.data)))
    .catch(error => console.log(error))
  }
}

export function sessionFetched(data) {
  return {
    type: "SESSION_FETCHED",
    data: data.attributes
  }
}

export function fetchHistoricalLinkData() {
  return dispatch => {
    dispatch(fetchingHistoricalLinks());
    const url = `http://localhost:3000/api/v1/user/links`
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
    dispatch(loading());
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
