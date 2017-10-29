import { authToken } from './auth';

export function fetchLinks(showLoader=true) {
  return dispatch => {
    if (showLoader === true) {
      dispatch(fetchingLinks());
    }
    return fetch('http://localhost:3000/api/v1/links', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(linksFetched(responseData)))
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
    links: links
  }
}

export function markLinkSeen(linkId) {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/links/${linkId}/seen`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .catch(error => console.log(error))
  }
}

export function castVote(linkId, type, context="feed") {
  return dispatch => {
    let action = type === "upvote" ? "POST" : "DELETE";
    return fetch(`http://localhost:3000/api/v1/links/${linkId}/vote`, {
      method: action,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(voteCasted(responseData.data, context))
    })
    .catch(error => console.log(error))
  }
}

export function voteCasted(updatedLink, context) {
  const actionType = context === "profile" ? "HISTORY_LINK_VOTED" : "LINK_VOTED";
  return {
    type: actionType,
    data: updatedLink
  }
}
