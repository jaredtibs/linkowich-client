const initialState = {
  links: [],
  linkPublishing: false,
  isFetching: false
};

export default function user(state=initialState, action) {
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
    default:
      return state;
  }
}
