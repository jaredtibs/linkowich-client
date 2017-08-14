const initialState = {
  links: [],
  isFetching: false,
  linkCount: 0
};

export default function feed(state=initialState, action) {
  switch (action.type) {
    case 'LINKS_FETCHED':
      return {
        ...state,
        isFetching: false,
        links: action.links.data,
        linkCount: action.links.meta.count
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
