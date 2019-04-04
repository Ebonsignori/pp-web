import { OPEN_MODAL, CLOSE_MODAL } from '../constants/action_types'
import { LOGIN } from '../constants/modals'

// Modals open/close state
const InitialState = {
  [LOGIN]: false
}

export default function modalReducer (state = InitialState, action) {
  switch (action.type) {
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
    case LOGIN:
      return {
        [LOGIN]: openState
      }
    default:
      console.error(`No modal for modal ${modal} passed into closeModal(modal)`)
      return {}
  }
}
