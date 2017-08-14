const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: '',
  currentLink: {},
  publishingLink: false,
  fetchingLink: false,
  loginErrors: {},
  registerErrors: {}
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_CURRENT_LINK':
      return {
        ...state,
        fetchingLink: true
      };
    case 'CURRENT_LINK_FETCHED':
      return {
        ...state,
        fetchingLink: false,
        currentLink: action.data
      };
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
    case 'PUBLISHING_LINK':
      return {
        ...state,
        publishingLink: true
      };
    case 'LINK_PUBLISHED':
      return {
        ...state,
        linkPublishing: false,
        currentLink: action.data
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
