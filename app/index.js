import React from 'react'
import { render } from 'react-dom'
import configureStore, { history } from './store/configure_store';
import Root from './containers/Root'

const store = configureStore()

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
