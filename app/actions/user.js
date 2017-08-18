import { push, replace } from 'react-router-redux';

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
      if(responseData.errors) {
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
    let token = localStorage.getItem('userToken');
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
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
