import {combineReducers} from 'redux'
import { routerReducer as router } from 'react-router-redux';
import user    from '../reducers/user'
import share   from '../reducers/share'
import feed    from '../reducers/feed'
import profile from '../reducers/profile'
import invite  from '../reducers/invite'

const rootReducer = combineReducers({
  user,
  feed,
  share,
  profile,
  invite,
  router
})

export default rootReducer
