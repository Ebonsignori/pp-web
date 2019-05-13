import { OPEN_MODAL, CLOSE_MODAL, WS_JOINED, WS_REMOVE_USER } from '../constants/action_types'
import { ALL_MODALS, JOIN_ROOM, NOTIFICATION } from '../constants/modals'

const initialState = {
  content: undefined
}

// Set each modal to closed by default
for (const modalName in ALL_MODALS) {
  initialState[modalName] = false
}

export default function modalReducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...getModalState(action.modalToOpen, true),
        content: action.content
      }
    case CLOSE_MODAL:
      return {
        ...state,
        ...getModalState(action.modalToClose, false),
        content: undefined
      }

    // When user joins room, close join room modal
    case WS_JOINED:
      return {
        ...state,
        [JOIN_ROOM]: false
      }

    // When a user is kicked from a room, let them knw
    case WS_REMOVE_USER:
      if (action.payload.username === action.loggedInUsername && action.payload.kicked) {
        return {
          ...state,
          [NOTIFICATION]: true,
          content: {
            heading: 'You have been removed from the room.',
            body: 'An administrator kicked you from the room. If this was a mistake, let them know.'
          }
        }
      }
      return state

    default:
      return state
  }
}

function getModalState (modal, openState) {
  for (const modalName in ALL_MODALS) {
    if (modal === modalName) return { [modalName]: openState }
  }
  console.error(`No modal for modal: ${modal} passed into getModalState. With openState: ${openState}`)
  return {}
}
