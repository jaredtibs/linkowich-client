//profile store used for both current users profile
//and friends profiles
const initialState = {
  username: '',
  avatar: '',
  score: 0,
  history: [],
  isFetchingInfo: false,
  isFetchingHistory: false
}

export default function profile(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_USER_PROFILE':
      return {
        ...state,
        isFetchingInfo: true
      };
    case 'PROFILE_FETCHED':
      return {
        ...state,
        isFetchingInfo: false,
        username: action.data.username,
        avatar: action.data.avatar,
        score: action.data.upvotes
      };
    case 'FETCHING_HISTORICAL_LINKS':
      return {
        ...state,
        isFetchingHistory: true
      };
    case 'HISTORICAL_LINKS_FETCHED':
      return {
        ...state,
        isFetchingHistory: false,
        history: action.data
      };
    case 'HISTORY_LINK_VOTED':
      const updatedLinks = state.history;
      const index = updatedLinks.findIndex(
        item => item.id === action.data.id
      );
      updatedLinks[index] = action.data
      return {
        ...state,
        history: updatedLinks
      };
    default:
      return state;
  }
}
