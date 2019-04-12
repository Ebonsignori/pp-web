import {
  CREATING_ROOM,
  FETCHING_ROOM,
  OPEN_WITH_CONTENT,
  WS_JOINED,
  WS_STORIES,
  FETCHING_ISSUES,
  ISSUES,
  WS_VOTE_LABEL,
  WS_USERS,
  WS_GAME_STATE,
  UPDATE_VOTE_LABEL,
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

    // When the user joins the room (only emitted to user)
    case WS_JOINED:
      return {
        ...state,
        gameState: action.payload.gameState,
        stories: action.payload.stories,
        users: action.payload.users,
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
      // case WS_STORIES:
      //   return {
      //     ...state,
      //     issuesFetched: true,
      //     issues: action.payload && action.payload.issues
      //   }

    // case WS_VOTE_LABEL:
    //   return {
    //     ...state,
    //     votingLabel: action.payload.label
    //   }
    // case UPDATE_VOTE_LABEL:
    //   return {
    //     ...state,
    //     votingLabel: action.label
    //   }
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
    case OPEN_WITH_CONTENT:
      return {
        ...state,
        roomId: action.roomId
      }
    default:
      return state
  }
}
