import {
  USER_LOGIN,
  USER_LOGOUT,
  FETCHING_MEMBERSHIPS,
  MEMBERSHIPS_LISTED
} from '../constants/action_types'

const initialState = {
  loggedIn: false,
  username: undefined,
  givenName: undefined,
  familyName: undefined,
  email: undefined,
  avatar: undefined,
  membershipsFetched: undefined,
  githubLinked: false,
  userRooms: [],
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
        givenName: action.givenName,
        familyName: action.familyName,
        email: action.email,
        avatar: action.avatar,
        githubLinked: action.githubLinked
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
