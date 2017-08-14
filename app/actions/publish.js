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
    type: "LINK_PUBLISHING"
  }
}

export function linkPublished(link) {
  return {
    type: "LINK_PUBLISHED",
    data: link.data
  }
}
