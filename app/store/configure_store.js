import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const history = createHashHistory();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  routerMiddleware(history)
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}

export { history };
