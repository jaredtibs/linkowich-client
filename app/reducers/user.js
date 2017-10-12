const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: {},
  pastLinks: [],
  loginErrors: {},
  registerErrors: {},
  isFetching: false,
  loading: false,
  score: 0
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
        avatar: action.data.avatar,
        score: action.data.upvotes,
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
      console.log(action.data)
      return {
        ...state,
        loggedIn: true,
        email: action.data.email,
        username: action.data.username,
        avatar: action.data.avatar,
        score: action.data.upvotes
      };
    case 'AVATAR_UPDATED':
      return {
        ...state,
        loading: false,
        avatar: action.avatar
      }
    default:
      return state;
  }
}
