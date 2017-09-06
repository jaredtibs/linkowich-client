//TODO move to own file and import where needed
function authToken() {
  let token = localStorage.getItem('userToken');
  return token;
}

export function fetchFollowers() {

}

export function fetchFollowing() {
  return dispatch => {
    dispatch(isFetching());
    return fetch("http://localhost:3000/api/v1/user/following", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken()
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(followingFetched(responseData));
    })
    .catch(error => console.log(error))
  }
}

export function isFetching() {
  return {
    type: "FETCHING_USERS"
  }
}

export function followingFetched(data) {
  return {
    type: "FOLLOWING_FETCHED",
    data: data
  }
}
