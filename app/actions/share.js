function authToken() {
  let token = localStorage.getItem('userToken');
  return token;
}

export function fetchCurrentLink() {
  return dispatch => {
    dispatch(fetchingLink());
    return fetch("http://localhost:3000/api/v1/links/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(linkFetched(responseData));
    })
    .catch(error => console.log(error))
  }
}

export function fetchingLink() {
  return {
    type: "FETCHING_CURRENT_LINK"
  }
}

export function linkFetched(link) {
  return {
    type: "CURRENT_LINK_FETCHED",
    data: link.data
  }
}

export function publishLink(url) {
  return dispatch => {
    dispatch(publishingLink());
    return fetch("http://localhost:3000/api/v1/links", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
      body: JSON.stringify({
        url: url
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(linkPublished(responseData));
    })
    .catch(error => console.log(error))
  }
}

export function publishingLink() {
  return {
    type: "PUBLISHING_LINK"
  }
}

export function linkPublished(link) {
  return {
    type: "LINK_PUBLISHED",
    data: link.data
  }
}

export function clearLink() {
  return dispatch => {
    dispatch(clearingLink());
    return fetch("http://localhost:3000/api/v1/links/me", {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.errors) {
        dispatch(handleError(responseData.errors))
      } else {
        dispatch(linkCleared())
      }
    })
    .catch(error => console.log(error))
  }
}

export function clearingLink() {
  return {
    type: "CLEARING_LINK"
  }
}

export function linkCleared() {
  return {
    type: "LINK_CLEARED"
  }
}

export function handleError(errors) {
  return {
    type: "SHARE_ERROR",
    errors: errors
  }
}
