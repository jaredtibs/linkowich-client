export function requestLogin (username, password) {
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
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
    //dispatch(pushToMain(false));
  }
}

export function receiveSession(sessionData) {
  localStorage.setItem('userToken', sessionData.token);

  return {
    type: "LOGGED_IN",
    data: sessionData.user.data.attributes
  }
}

export function loading() {
  return {
    type: "LOADING"
  }
}

export function checkUserSession() {
  return dispatch => {
    let token = localStorage.getItem('userToken');
    if (token) {
      dispatch(fetchUserSession(token));
      //Actions.main({type: 'reset'});
    } else {
      //Actions.landing({type: 'reset'});
    }
  }
}

export function fetchUserSession(token) {
  return dispatch => {
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
