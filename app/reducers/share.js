const initialState = {
  currentLink: null,
  publishingLink: false,
  fetchingLink: false,
  clearingLink: false,
  shareErrors: {}
}

export default function share(state=initialState, action) {
  switch(action.type) {
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
    case 'PUBLISHING_LINK':
      return {
        ...state,
        publishingLink: true
      };
    case 'LINK_PUBLISHED':
      return {
        ...state,
        publishingLink: false,
        currentLink: action.data
      };
    case 'CLEARING_LINK':
      return {
        ...state,
        clearingLink: true
      };
    case 'LINK_CLEARED':
      return {
        ...state,
        clearingLink: false,
        currentLink: null
      };
    case 'SHARE_ERROR':
      return {
        ...state,
        shareError: true
      };
    default:
      return state;
  }
}
