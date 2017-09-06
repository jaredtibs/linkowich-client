const initialState = {
  followers: [],
  following: [],
  isFetching: false
}

export default function friends(state=initialState, action) {
  switch(action.type) {
    case 'FETCHING_USERS':
      return {
        ...state,
        isFetching: true
      };
    case 'FOLLOWING_FETCHED':
      return {
        ...state,
        isFetching: false,
        following: action.data.data
      };
    default:
      return state;
  }
}
