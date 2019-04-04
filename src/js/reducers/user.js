import {
  WS_USER_LOGGED_IN,
  USER_LOGIN,
  USER_LOGOUT,
  FETCHING_MEMBERSHIPS,
  MEMBERSHIPS_LISTED
} from '../constants/action_types'

const initialState = {
  loggedIn: false,
  username: undefined,
  avatar: undefined,
  membershipsFetched: undefined,
  orgs: [],
  repos: []
}

// Websocket reducer
export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        avatar: action.avatar
      }
    case WS_USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        avatar: action.payload.avatar
      }

    case USER_LOGOUT:
      return { ...initialState }

    case FETCHING_MEMBERSHIPS:
      return {
        ...state,
        membershipsFetched: false
      }
    case MEMBERSHIPS_LISTED:
      return {
        ...state,
        membershipsFetched: true,
        orgs: action.orgs,
        repos: action.repos
      }

    default:
      return state
  }
}
