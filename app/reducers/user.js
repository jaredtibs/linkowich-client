const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: '',
  loginErrors: {},
  registerErrors: {}
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
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
        loginErrors: action.errors
      };
    case 'SESSION_FETCHED':
      return {
        ...state,
        loggedIn: true,
        email: action.data.email,
        username: action.data.username
      };
    default:
      return state;
  }
}
