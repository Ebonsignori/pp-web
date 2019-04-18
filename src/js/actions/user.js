import { USER_LOGOUT, USER_LOGIN } from '../constants/action_types'
import { jsonGet } from '../utility/fetch'
import { openModal } from './modals'
import { ACCOUNT } from '../constants/modals'

export const userNotLoggedIn = {
  type: USER_LOGOUT
}

export function loggedIn (profile) {
  return {
    type: USER_LOGIN,
    username: profile.username,
    givenName: profile.givenName,
    familyName: profile.familyName,
    email: profile.email,
    avatarUrl: profile.avatarUrl,
    githubLinked: profile.githubLinked
  }
}

export function logout () {
  return async dispatch => {
    const logoutResp = await jsonGet('/users/logout')
    if (logoutResp && logoutResp.status === 200) {
      dispatch(userNotLoggedIn) // logout user, but don't open login modal
    } else {
      // TODO:
    }
  }
}

export function notLoggedIn () {
  return dispatch => {
    // Update login status and open login modal
    dispatch(userNotLoggedIn)
    dispatch(openModal(ACCOUNT))
  }
}
