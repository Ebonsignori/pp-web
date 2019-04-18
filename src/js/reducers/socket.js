import {
  WS_CONNECT,
  WS_DISCONNECT,
  SET_ERROR_CONTEXT,
  WS_ERROR,
  CLEAR_ERROR
} from '../constants/action_types'

const initialState = {
  status: 'disconnected',
  errorType: undefined,
  errorContext: undefined
}

export default function websocketReducer (state = initialState, action) {
  switch (action.type) {
    case WS_CONNECT:
      return {
        ...state,
        status: 'connected'
      }
    case WS_DISCONNECT:
      return {
        ...state,
        status: 'disconnected'
      }
    case SET_ERROR_CONTEXT:
      return {
        ...state,
        errorContext: action.errorContext
      }
    case WS_ERROR:
      return {
        ...state,
        errorType: action.payload.errorType
      }
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
