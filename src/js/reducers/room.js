import {
  FETCHING_ROOM,
  WS_JOINED,
  WS_ISSUES,
  WS_VOTE_LABEL,
  WS_USERS,
  WS_GAME_STATE,
  UPDATE_VOTE_LABEL,
  USER_LOGOUT
} from '../constants/action_types'

// Every room is scopes to owner/repo room
const initialState = {
  roomSlug: undefined, // "owner/repo"
  connectedUsers: [],
  owner: undefined,
  repo: undefined,
  roomConnected: undefined,
  issuesFetched: undefined,
  issues: [],
  votingLabel: undefined,
  gameState: {},
  users: []
}

export default function roomReducer (state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...initialState }

    case FETCHING_ROOM:
      return {
        ...state,
        owner: action.owner,
        repo: action.repo,
        roomConnected: false,
        issuesFetched: false
      }
    case WS_JOINED:
      const connectedUsers = [...state.connectedUsers, action.payload.username]
      return {
        ...state,
        connectedUsers,
        roomSlug: action.thisUser ? action.roomSlug : state.roomSlug,
        roomConnected: action.thisUser ? true : state.roomConnected
      }

    // TODO: Account for failed room fetch
    case WS_ISSUES:
      return {
        ...state,
        issuesFetched: true,
        issues: action.payload && action.payload.issues
      }

    case WS_VOTE_LABEL:
      return {
        ...state,
        votingLabel: action.payload.label
      }
    case UPDATE_VOTE_LABEL:
      return {
        ...state,
        votingLabel: action.label
      }
    case WS_USERS:
      return {
        ...state,
        users: action.payload.users
      }
    case WS_GAME_STATE:
      return {
        ...state,
        gameState: action.payload.gameState
      }
    default:
      return state
  }
}
