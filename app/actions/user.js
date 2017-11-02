import { push, replace } from 'react-router-redux';
import { authToken } from './auth';

export function login (email, password) {
  return dispatch => {
    dispatch(submitting());
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
    dispatch(submitting());
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
    type: "SERVER_FIELD_ERROR",
    errors: errors
  }
}

export function logout() {
  return dispatch => {
    dispatch(logOutUser())
    dispatch(replace("/landing"))
  }
}

export function logOutUser() {
  localStorage.removeItem('userToken');
  return {
    type: "LOGGED_OUT"
  }
}

export function resetPassword() {
  return dispatch => {
    dispatch(submitting())
    dispatch(passwordResetSent());
  }
}

export function passwordResetSent() {
  return {
    type: "RESET_PASSWORD_INITIATED"
  }
}

export function submitting() {
  return {
    type: "SUBMITTING"
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

export function clearLinkHistory() {
  return dispatch => {
    dispatch(clearingHistory());
    return fetch("http://localhost:3000/api/v1/links", {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(historyCleared()))
    .catch(error => console.log(error))
  }
}
