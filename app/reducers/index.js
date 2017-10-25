import {combineReducers} from 'redux'
import { routerReducer as router } from 'react-router-redux';
import user    from '../reducers/user'
import share   from '../reducers/share'
import feed    from '../reducers/feed'
import profile from '../reducers/profile'
import invite  from '../reducers/invite'

const appReducer = combineReducers({
  user,
  feed,
  share,
  profile,
  invite,
  router
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    console.log("in root reducer - wiping state")
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
