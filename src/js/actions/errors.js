import { SET_ERROR_CONTEXT, CLEAR_ERROR } from '../constants/action_types'

export function setErrorContext (errorContext) {
  return {
    type: SET_ERROR_CONTEXT,
    errorContext
  }
}

export const clearError = {
  type: CLEAR_ERROR
}

export const errorContexts = {
  GUEST_USERNAME: 'GUEST_USERNAME'
}
