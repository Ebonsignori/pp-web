import {
  USER_LOGIN,
  USER_LOGOUT,
  FETCHING_MEMBERSHIPS,
  MEMBERSHIPS_LISTED,
  FETCHING_ROOM
} from '../constants/action_types'

const initialState = {
  loggedIn: false,
  isGuest: false,
  guestUsername: undefined,
  username: undefined,
  givenName: undefined,
  familyName: undefined,
  email: undefined,
  avatarUrl: undefined,
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
      console.log(action.avatarUrl)
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        givenName: action.givenName,
        familyName: action.familyName,
        email: action.email,
        avatarUrl: action.avatarUrl,
        githubLinked: action.githubLinked
      }
    case FETCHING_ROOM:
      return {
        ...state,
        isGuest: !!action.guestUsername,
        guestUsername: action.guestUsername
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
