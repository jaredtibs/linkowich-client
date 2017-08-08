const initialState = {
  isLoggedIn: false,
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
        isLoggedIn: true
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'LOGIN_ERROR':
      return {
        ...state,
        errors: action.errors
      };
    case 'LOGIN_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'SESSION_FETCHED':
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        avatar: action.data.avatar.url,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
