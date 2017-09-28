const initialState = {
  friends: [],
  isFetching: false,
  isSubmitting: false,
  followContext: 'followers'
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
    case 'FRIEND_ADDED':
      return {
        ...state,
        isSubmitting: false
      };
    case 'USER_UPDATED':
      const updatedFriends = state.friends;
      const index = updatedFriends.findIndex(
        item => item.id === action.data.id
      );
      updatedFriends[index] = action.data
      return {
        ...state,
        friends: updatedFriends
      };
    case 'SUBMITTING':
      return {
        ...state,
        isSubmitting: true
      };
    default:
      return state;
  }
}
