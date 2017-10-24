//TODO delete me
const initialState = {
  friends: [],
  isFetching: false,
  isSubmitting: false
}

export default function friends(state=initialState, action) {
  switch(action.type) {
    case 'FRIEND_ADDED':
      return {
        ...state,
        isSubmitting: false
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
