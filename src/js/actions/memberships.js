import { MEMBERSHIPS_LISTED, FETCHING_MEMBERSHIPS, FETCHING_MEMBERSHIPS_TIMEOUT } from '../constants/action_types'
import { jsonGet } from '../utility/fetch'
import { userNotLoggedIn } from './user'
import { store } from '../app'
import { MEMBERSHIP_FETCH_TIMEOUT } from '../config/config'

export function listMemberships () {
  // Set a timeout that if reached and issues have not been reached, issues weren't fetched correctly
  window.setTimeout(() => {
    if (!store.getState().room.issuesFetched) {
      store.dispatch({ type: FETCHING_MEMBERSHIPS_TIMEOUT })
    }
  }, MEMBERSHIP_FETCH_TIMEOUT)

  return async dispatch => {
    dispatch({ // set fetched state to false
      type: FETCHING_MEMBERSHIPS
    })
    // const orgResp = await jsonGet('/list/orgs')
    const repoResp = await jsonGet('/list/repos')
    // if (orgResp.notLoggedIn || repoResp.notLoggedIn) {
    if (repoResp.notLoggedIn) {
      dispatch(userNotLoggedIn)
    // } else if (orgResp.status === 404 && repoResp.status === 404) {
    } else if (repoResp.status === 404) {
      console.log('Github app not installed')
    } else {
      dispatch({
        type: MEMBERSHIPS_LISTED,
        // orgs: orgResp.orgs,
        orgs: [],
        repos: repoResp.repos
      })
    }
  }
}
