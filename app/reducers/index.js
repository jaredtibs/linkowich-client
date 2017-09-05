import {combineReducers} from 'redux'
import { routerReducer as router } from 'react-router-redux';
import user  from '../reducers/user'
import share from '../reducers/share'
import feed  from '../reducers/feed'

const rootReducer = combineReducers({
  user,
  feed,
  share,
  router
})

export default rootReducer
