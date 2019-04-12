import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app'
import { initStore } from './store'

// TODO: move this
import { getParameterByName } from './utility/utility'
import { openModal } from './actions/modals'
import { JOIN_ROOM } from './constants/modals'

const { socket, store } = initStore()
socket.connect()
export { socket, store }

// TODO: Move this
const roomId = getParameterByName('join')
if (roomId) {
  store.dispatch(openModal(JOIN_ROOM, {
    roomId: roomId
  }))
}

// Insert react app, wrapped by redux provider, into top-level html DOM
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
