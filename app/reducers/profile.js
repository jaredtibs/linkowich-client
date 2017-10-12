//profile store used for both current users profile
//and friends profiles
const initialState = {
  username: '',
  avatar: '',
  score: 0,
  history: [],
  isFetching: false
}

export default function profile(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_USER_PROFILE':
      return {
        ...state,
        isFetching: true
      };
    case 'PROFILE_FETCHED':
      return {
        ...state,
        isFetching: false,
        username: action.data.username,
        avatar: action.data.avatar,
        score: action.data.upvotes
      };
    case 'FETCHING_HISTORICAL_LINKS':
      return {
        ...state,
        isFetching: true
      };
    case 'HISTORICAL_LINKS_FETCHED':
      return {
        ...state,
        isFetching: false,
        history: action.data
      };
    default:
      return state;
  }
}
