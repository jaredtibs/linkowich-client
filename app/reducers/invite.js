const initialState = {
  invitedUser: null,
  addedFriend: null,
  emailAdded: false,
  codeAdded: false,
  hasError: false,
  isSubmitting: false
}

export default function invite(state=initialState, action) {
  switch(action.type) {
    case 'SUBMITTING':
      return {
        ...state,
        isSubmitting: true,
        hasError: false,
        emailAdded: false,
        codeAdded: false
      };
    case 'FRIEND_ADDED':
      return {
        ...state,
        isSubmitting: false,
        codeAdded: true
      };
    case 'INVITE_SENT':
      return {
        ...state,
        isSubmitting: false,
        emailAdded: true
      }
    default:
      return state;
  }
}
