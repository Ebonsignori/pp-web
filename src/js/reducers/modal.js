import { OPEN_MODAL, CLOSE_MODAL, WS_JOINED } from '../constants/action_types'
import { ACCOUNT, JOIN_ROOM } from '../constants/modals'

// Modals open/close state
const InitialState = {
  [ACCOUNT]: false,
  [JOIN_ROOM]: false
}

export default function modalReducer (state = InitialState, action) {
  switch (action.type) {
    case WS_JOINED:
      return {
        ...state,
        [JOIN_ROOM]: false
      }
    case OPEN_MODAL:
      return {
        ...state,
        ...getModalState(action.modalToOpen, true)
      }
    case CLOSE_MODAL:
      return {
        ...state,
        ...getModalState(action.modalToClose, false)
      }
    default:
      return state
  }
}

function getModalState (modal, openState) {
  switch (modal) {
    case ACCOUNT:
      return {
        [ACCOUNT]: openState
      }
    case JOIN_ROOM:
      return {
        [JOIN_ROOM]: openState
      }
    default:
      console.error(`No modal for modal ${modal} passed into closeModal(modal)`)
      return {}
  }
}
