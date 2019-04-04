import { combineReducers } from 'redux'

import modalReducer from './modal'
import websocketReducer from './socket'
import userReducer from './user'
import roomReducer from './room'

// Combine all reducers and export them for store
export const allReducers = combineReducers({
  modal: modalReducer,
  room: roomReducer,
  socket: websocketReducer,
  user: userReducer
})
