import {
  WS_CONNECT,
  WS_DISCONNECT
} from '../constants/action_types'

const initialState = {
  status: 'disconnected'
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
    default:
      return state
  }
}
