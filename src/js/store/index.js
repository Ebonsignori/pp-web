import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { allReducers } from '../reducers/index'
import { initSocket } from '../socket/socket'

export function initStore () {
  // Configure thunk middleware for socket.io
  // const emit = (type, payload) => socket.emit(type, payload)
  // const thunkMiddle = thunk.withExtraArgument({ emit: emit })

  // Logger middleware (defaults)
  const loggerMiddle = logger

  // Apply middleware and reducers to store
  const middleware = applyMiddleware(thunk, loggerMiddle)
  const store = createStore(allReducers, middleware)

  // Initialize Socket
  const socket = initSocket(store)

  // TODO: For accessing store in dev console (remove in production)
  // window.store = store

  return { socket, store }
}
