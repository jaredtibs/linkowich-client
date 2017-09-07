const initialState = {
  friends: [],
  isFetching: false,
  followContext: 'following'
}

export default function friends(state=initialState, action) {
  switch(action.type) {
    case 'FETCHING_FRIENDS':
      return {
        ...state,
        isFetching: true
      };
    case 'FRIENDS_FETCHED':
      return {
        ...state,
        isFetching: false,
        friends: action.data.data
      };
    case 'FOLLOW_CONTEXT_TOGGLED':
      return {
        ...state,
        followContext: action.data
      };
    default:
      return state;
  }
}
