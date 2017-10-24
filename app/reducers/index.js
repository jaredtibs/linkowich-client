import {combineReducers} from 'redux'
import { routerReducer as router } from 'react-router-redux';
import user    from '../reducers/user'
import share   from '../reducers/share'
import feed    from '../reducers/feed'
import friends from '../reducers/friends'
import profile from '../reducers/profile'
import invite  from '../reducers/invite'

const rootReducer = combineReducers({
  user,
  feed,
  share,
  friends,
  profile,
  invite,
  router
})

export default rootReducer
