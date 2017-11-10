const initialState = {
  invitedUser: null,
  addedFriend: null,
  hasError: false,
  isSubmitting: false
}

export default function invite(state=initialState, action) {
  switch(action.type) {
    case 'SUBMITTING':
      return {
        ...state,
        isSubmitting: true,
        hasError: false
      };
    case 'FRIEND_ADDED':
      return {
        ...state,
        isSubmitting: false
      };
    case 'INVITE_SENT':
      return {
        ...state,
        isSubmitting: false
      }
    default:
      return state;
  }
}
