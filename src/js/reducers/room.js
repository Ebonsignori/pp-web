import {
  CREATING_ROOM,
  FETCHING_ROOM,
  WS_JOINED,
  WS_VOTE,
  WS_STORIES,
  WS_GAME_STATE,
  USER_LOGOUT,
  WS_USER,
  WS_REMOVE_USER,
  OPEN_MODAL,
  WS_STORY,
  FETCHING_ISSUES,
  FETCHING_ISSUES_TIMEOUT,
  ISSUES
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
  issueFetchTimeout: false,
  issues: [],
  privileges: undefined,
  removedFromRoom: false
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
      const users = [...state.users]
      const newUser = action.payload.user
      if (!state.users.find(user => user.username === newUser.username)) {
        users.push(newUser)
      }
      return {
        ...state,
        users
      }

    // When a user leaves/is kicked from a room
    case WS_REMOVE_USER:
      // If the user being removed is the logged in user (this user), remove this user from room
      if (action.payload.username === action.loggedInUsername) {
        return { ...initialState } // reset state of room (leave room)
      } else {
        // Remove the user from list of users in room
        const users = state.users.filter(user => user.username !== action.payload.username)
        return {
          ...state,
          users
        }
      }

    // When the user joins the room (only emitted to user)
    case WS_JOINED:
      return {
        ...state,
        gameState: action.payload.gameState,
        privileges: action.payload.privileges,
        users: action.payload.users,
        stories: action.payload.stories,
        roomConnected: true
      }

    // Account for failed room fetch
    case WS_STORIES:
      return {
        ...state,
        stories: action.payload.stories
      }
    case WS_STORY:
      const updatedStory = action.payload.story
      const stories = [...state.stories].map(story => {
        if (story.id === updatedStory.id) return updatedStory
        return story
      })
      return {
        ...state,
        stories
      }

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
    case OPEN_MODAL:
      if (action.content && action.content.roomId) {
        return {
          ...state,
          roomId: action.content.roomId
        }
      }
      return state

    // TODO: move? For creating room
    case FETCHING_ISSUES:
      return {
        ...state,
        fetchingIssues: true,
        issueFetchTimeout: false,
        issuesFetched: false
      }

    case FETCHING_ISSUES_TIMEOUT:
      return {
        ...state,
        fetchingIssues: false,
        issueFetchTimeout: true
      }

    // TODO: move? For creating room
    case ISSUES:
      if (!state.issueFetchTimeout) {
        return {
          ...state,
          fetchingIssues: false,
          issuesFetched: true,
          issues: action.issues
        }
      } else {
        return {
          ...state
        }
      }

    default:
      return state
  }
}
