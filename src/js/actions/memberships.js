import { MEMBERSHIPS_LISTED, FETCHING_MEMBERSHIPS } from '../constants/action_types'
import { jsonGet } from '../utility/fetch'
import { userNotLoggedIn } from './user'

export function listMemberships () {
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
