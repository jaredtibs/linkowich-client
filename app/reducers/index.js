import {combineReducers} from 'redux'
import user from '../reducers/user'
import feed from '../reducers/feed'

const rootReducer = combineReducers({
  user,
  feed
})

export default rootReducer
