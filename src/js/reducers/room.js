import {
  CREATING_ROOM,
  FETCHING_ROOM,
  OPEN_WITH_CONTENT,
  WS_JOINED,
  WS_VOTE,
  FETCHING_ISSUES,
  ISSUES,
  WS_USERS,
  WS_STORIES,
  WS_GAME_STATE,
  USER_LOGOUT,
  WS_USER
} from '../constants/action_types'

const initialState = {
  roomId: undefined,
  creatingRoom: false,
  roomConnected: undefined,
  stories: [],
  votingLabel: undefined,
  gameState: {},
  users: [],
  userVote: undefined,
  issuesFetched: false,
  issues: []
}

export default function roomReducer (state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...initialState }

    // TODO: move? For creating room
    case CREATING_ROOM:
      return {
        creatingRoom: action.creatingRoom
      }

    case FETCHING_ROOM:
      return {
        ...state,
        roomId: action.roomId,
        roomConnected: false
      }

    // When a new user joins (emitted to room)
    case WS_USER:
      const users = [...state.users, action.payload.user]
      return {
        ...state,
        users
      }

    case WS_USERS:
      return {
        ...state,
        users: action.payload.users
      }

    // When the user joins the room (only emitted to user)
    case WS_JOINED:
      return {
        ...state,
        gameState: action.payload.gameState,
        stories: action.payload.stories,
        roomConnected: true
      }

    // TODO: move? For creating room
    case FETCHING_ISSUES:
      return {
        ...state,
        issuesFetched: false
      }

    // TODO: move? For creating room
    case ISSUES:
      return {
        ...state,
        issuesFetched: true,
        issues: action.issues
      }

      // TODO: Account for failed room fetch
    case WS_STORIES:
      return {
        ...state,
        stories: action.payload.stories
      }

    // case WS_USERS:
    //   return {
    //     ...state,
    //     users: action.payload.users
    //   }
    case WS_GAME_STATE:
      return {
        ...state,
        gameState: action.payload.gameState
      }
    case WS_VOTE:
      return {
        ...state,
        userVote: action.payload.userVote
      }
    case OPEN_WITH_CONTENT:
      return {
        ...state,
        roomId: action.roomId
      }
    default:
      return state
  }
}
