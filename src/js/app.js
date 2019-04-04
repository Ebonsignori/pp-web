import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app'
import { initStore } from './store'

const { socket, store } = initStore()
socket.connect()
export { socket, store }

// Insert react app, wrapped by redux provider, into top-level html DOM
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
