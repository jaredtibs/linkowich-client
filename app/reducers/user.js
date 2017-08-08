const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: null,
  errors: {}
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
        loggedIn: true
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'LOGIN_ERROR':
      return {
        ...state,
        errors: action.errors
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'SESSION_FETCHED':
      return {
        ...state,
        loggedIn: true,
        email: action.data.email
      };
    default:
      return state;
  }
}
