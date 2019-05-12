import io from 'socket.io-client'
import { API_URL, WEBSOCKET_TIMEOUT } from '../config/config'
import { WEBSOCKET_ACTIONS } from '../constants/action_types'

export function initSocket (store) {
  // Initialize socket-io object
  const socket = io(API_URL, {
    transports: ['websocket'],
    timeout: WEBSOCKET_TIMEOUT,
    autoConnect: false
  })

  // Generate iterable websocket actions object
  const websocketActions = Object.keys(WEBSOCKET_ACTIONS).reduce((memo, key) => {
    memo[key] = key
    return memo
  }, {})

  // Add an event listener for every websocket action. Each listener fires a redux store dispatch with payload contents (if there is an action defined for the emit)
  Object.keys(websocketActions).forEach(type =>
    socket.on(WEBSOCKET_ACTIONS[type], payload => {
      store.dispatch({ type: type, date: new Date(), payload, socket })
    })
  )

  return socket
}
