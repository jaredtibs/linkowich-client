import {combineReducers} from 'redux'
import { routerReducer as router } from 'react-router-redux';
import user from '../reducers/user'
import feed from '../reducers/feed'

const rootReducer = combineReducers({
  user,
  feed,
  router
})

export default rootReducer
