const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: null
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        avatar: action.data.avatar.url,
        loading: false,
        isLoggedIn: true
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
