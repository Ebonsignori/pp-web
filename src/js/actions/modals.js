import { CLOSE_MODAL, OPEN_MODAL } from '../constants/action_types'

// Opens (displays) a react-modal on dispatch
export function openModal (modalToOpen) {
  return {
    type: OPEN_MODAL,
    modalToOpen
  }
}

// Closes a react-modal on dispatch
export function closeModal (modalToClose) {
  return {
    type: CLOSE_MODAL,
    modalToClose
  }
}
