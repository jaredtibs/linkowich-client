const initialState = {
  userLink: [],
  links: [],
  isPublishing: false,
  isFetching: false
};

export default function feed(state=initialState, action) {
  switch (action.type) {
    case 'LINKS_FETCHED':
      return {
        ...state,
        isFetching: false,
        links: action.data
      }
    case 'FETCHING_LINKS':
      return {
        ...state,
        isFetching: true
      }
    case 'LINK_PUBLISHING':
      return {
        ...state,
        isPublishing: true
      }
    case 'LINK_PUBLISHED':
      return {
        ...state,
        isPublishing: false,
        userLink: action.data
      }
    default:
      return state;
  }
}
