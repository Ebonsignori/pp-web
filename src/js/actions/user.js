import { store, socket } from '../app'
import { USER_LOGOUT, USER_LOGIN } from '../constants/action_types'
import { jsonGet, jsonPost } from '../utility/fetch'
import { openModal } from './modals'
import { ACCOUNT } from '../constants/modals'
import { upsertProperty, readProperty } from '../utility/localStorage'

export const userNotLoggedIn = {
  type: USER_LOGOUT
}

export function loggedIn (profile) {
  if (profile.isGuest) {
    if (readProperty('guestUsername') === profile.username) {
      profile.username = profile.username.substr(0, profile.username.indexOf('_'))
    }
  }
  return {
    type: USER_LOGIN,
    username: profile.username,
    isGuest: profile.isGuest,
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
      socket.disconnect()
      console.log('Socket disconnecting...')
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

export async function registerGuest (guestUsername) {
  const response = await jsonPost('/users/register-guest', {
    username: guestUsername
  })

  if (response.status === 201) {
    // Insert guestUsername with cuid into cache
    upsertProperty('guestUsername', response.username)
    store.dispatch(loggedIn(response))
  } else {
    // TODO: Handle errors in caller
    return response
  }
}
