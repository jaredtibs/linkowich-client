import React from 'react'
import { render } from 'react-dom'
import configureStore, { history } from './store/configure_store';
import Root from './containers/Root'

const store = configureStore()
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
require('!style-loader!css-loader!./assets/vendor/material.min.css')
require('./assets/vendor/material.min.js')

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
