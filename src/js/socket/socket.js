import io from 'socket.io-client'
import { API_URL, WEBSOCKET_TIMEOUT } from '../config/config'
import { WEBSOCKET_ACTIONS, WS_REMOVE_USER } from '../constants/action_types'
import { readProperty } from '../utility/localStorage';

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
      let includedFromStore = {} // On certain emits, we want to include data from one reducer in another
      if (type === WS_REMOVE_USER) {
        // Include username so we can see if the logged in user was kicked
        const userState = store.getState().user
        let loggedInUsername = userState.username
        if (userState.isGuest) loggedInUsername = readProperty('guestUsername')
        includedFromStore = { loggedInUsername }
      }
      store.dispatch({
        type: type,
        date: new Date(),
        payload,
        ...includedFromStore
      })
    })
  )

  return socket
}
