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
    dispatch(pushToMain(false));
  }
}

export function receiveSession(sessionData) {
  //save token in local storage

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
