export function fetchLinks() {
  return dispatch => {
    dispatch(fetchingLinks());
    return fetch('http://localhost:3000/api/v1/links', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(linksFetched(responseData.data)))
    .catch(error => console.log(error))
  }
}

export function fetchingLinks() {
  return {
    type: "FETCHING_LINKS"
  }
}

export function linksFetched(links) {
  return {
    type: "LINKS_FETCHED",
    data: links
  }
}

export function apiRequestHeaders() {
  return({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + auth_token
  })
}

