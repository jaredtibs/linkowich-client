import {combineReducers} from 'redux'
import user from  '../reducers/user'
//import routes from '../reducers/routes'

const rootReducer = combineReducers({
  user
})

export default rootReducer
