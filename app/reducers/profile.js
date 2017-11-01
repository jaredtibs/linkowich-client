//profile store used for both current users profile
//and friends profiles
const initialState = {
  username: '',
  defaultAvatarColor: '',
  avatar: '',
  score: 0,
  profileContext: 'history',
  history: [],
  friends: [],
  isFetchingInfo: false,
  isFetchingTab: false,
  isSubmitting: false
}

export default function profile(state=initialState, action) {
  switch (action.type) {
    case 'AVATAR_UPDATED':
      return {
        ...state,
        isSubmitting: false,
        avatar: action.avatar
      };
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
        defaultAvatarColor: action.data['default-avatar-color'],
        score: action.data.upvotes
      };
    case 'PROFILE_CONTEXT_TOGGLED':
      return {
        ...state,
        profileContext: action.data
      };
    case 'FRIENDS_FETCHED':
      return {
        ...state,
        isFetchingTab: false,
        friends: action.data.data
      };
    case 'HISTORICAL_LINKS_FETCHED':
      return {
        ...state,
        isFetchingTab: false,
        history: action.data
      };
    case 'HISTORY_LINK_VOTED':
      const updatedLinks = state.history;
      const historyIndex = updatedLinks.findIndex(
        item => item.id === action.data.id
      );
      updatedLinks[historyIndex] = action.data
      return {
        ...state,
        history: updatedLinks
      };
    case 'USER_UPDATED':
      const updatedFriends = state.friends;
      const userIndex = updatedFriends.findIndex(
        item => item.id === action.data.id
      );
      updatedFriends[userIndex] = action.data
      return {
        ...state,
        friends: updatedFriends
      };
    case 'SUBMITTING':
      return {
        ...state,
        isSubmitting: true
      };
    case 'FETCHING_TAB_CONTENT':
      return {
        ...state,
        isFetchingTab: true
      };
    default:
      return state;
  }
}
