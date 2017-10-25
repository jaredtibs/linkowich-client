const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  avatar: {},
  hasUnseenInvites: false,
  invitations: [],
  hasError: false,
  fieldErrors: {count: 0},
  isFetching: false,
  loading: false,
  resetPasswordInitiated: false,
  score: 0,
  followCode: ''
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case 'SUBMITTING':
      return {
        ...state,
        loading: true,
        hasError: false
      };
    case 'LOGGED_IN':
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        avatar: action.data.avatar,
        score: action.data.upvotes,
        followCode: action.data['follow-code'],
        hasUnseenInvites: action.data['unseen-invitations'],
        loading: false,
        hasError: false,
        loggedIn: true
      };
      //moved to root reducer
      //case 'LOGGED_OUT':
      //return initialState;
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
        username: action.data.username,
        avatar: action.data.avatar,
        score: action.data.upvotes,
        followCode: action.data['follow-code'],
        hasUnseenInvites: action.data['unseen-invitations']
      };
    case 'RESET_PASSWORD_INITIATED':
      return {
        ...state,
        loading: false,
        resetPasswordInitiated: true
      };
    case 'SERVER_FIELD_ERROR':
      return {
        ...state,
        loading: false,
        hasError: true,
        fieldErrors: constructErrorObject(action.errors)
      };
    case 'FETCHING_INVITATIONS':
      return {
        ...state,
        isFetching: true
      };
    case 'INVITATIONS_FETCHED':
      return {
        ...state,
        isFetching: false,
        invitations: action.data.data
      };
    default:
      return state;
  }
}

function constructErrorObject(errors) {
  if (errors.length > 0) {
    let errorObj = {};
    let i;
    for(i=0; i < errors.length; i++) {
      let error = errors[i];
      if (error.match(/email/i)) {
        errorObj['email'] = {
          message: "Email already in use."
        }
      } else if (error.match(/username/i)) {
          errorObj['username'] = {
            message: "Username taken."
          }
      } else if (error.match(/account not found/i)) {
          errorObj['email'] = {
            message: "No account found with that email or username."
          }
      } else if (error.match(/unauthorized/i)) {
          errorObj['password'] = {
            message: "Password incorrect."
          }
      }
    }
    errorObj['count'] = errors.length
    return errorObj
  } else {
    return {};
  }
}
