import {
  WS_CONNECT,
  WS_DISCONNECT,
  SET_ERROR_CONTEXT,
  WS_ERROR,
  CLEAR_ERROR,
  USER_LOGIN,
  USER_LOGOUT
} from '../constants/action_types'
import { socket } from '../app'

const initialState = {
  status: 'disconnected',
  errorType: undefined,
  errorContext: undefined
}

export default function websocketReducer (state = initialState, action) {
  switch (action.type) {
    // Connect WS after user has logged in
    case USER_LOGIN:
      socket.connect()
      console.log('Socket connecting...')
      return {
        ...state,
        status: 'connected'
      }
    case USER_LOGOUT:
      return {
        ...state,
        status: 'disconnected'
      }
    // Context of error is set before an emit to WS api
    case SET_ERROR_CONTEXT:
      return {
        ...state,
        errorType: action.errorType,
        errorContext: action.errorContext
      }
    // An error type can be fired from the WS api and can now be handled within the context set before calling emit
    case WS_ERROR:
      return {
        ...state,
        errorType: action.payload.errorType
      }
    // Reset WS error state
    case CLEAR_ERROR:
      return {
        ...state,
        errorContext: undefined,
        errorType: undefined
      }
    default:
      return state
  }
}
