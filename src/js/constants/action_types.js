// Memberships (Orgs and Repos)
export const FETCHING_MEMBERSHIPS = 'FETCHING_MEMBERSHIPS'
export const MEMBERSHIPS_LISTED = 'MEMBERSHIPS_LISTED'
export const FETCHING_MEMBERSHIPS_TIMEOUT = 'FETCHING_MEMBERSHIPS_TIMEOUT'

// Room
export const CREATING_ROOM = 'CREATING_ROOM'
export const FETCHING_ROOM = 'FETCHING_ROOM'

// =======================
// Modal Management
// =======================
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// =======================
// Websocket
// =======================
// Websocket connection status
// export const WS_CONNECT = 'WS_CONNECT'
// export const WS_DISCONNECT = 'WS_DISCONNECT'

// Websocket error
export const WS_ERROR = 'WS_ERROR'
export const SET_ERROR_CONTEXT = 'SET_ERROR_CONTEXT'
export const CLEAR_ERROR = 'CLEAR_ERROR'

// Websocket subscription status
export const SUBSCRIBE = 'WS_SUBSCRIBE'
export const UNSUBSCRIBE = 'WS_UNSUBSCRIBE'

// User
export const USER_LOGIN = 'USER_LOGIN'
export const WS_USER_LOGGED_IN = 'WS_USER_LOGGED_IN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const WS_USER_NOT_LOGGED_IN = 'WS_USER_NOT_LOGGED_IN'

// - - - Room - - -
// Issues
export const FETCHING_ISSUES = 'FETCHING_ISSUES'
export const FETCHING_ISSUES_TIMEOUT = 'FETCHING_ISSUES_TIMEOUT'
export const ISSUES = 'ISSUES' // TODO: remove WS issues as now fetching /w REST
export const WS_STORIES = 'WS_STORIES'
export const WS_STORY = 'WS_STORY'
export const WS_JOINED = 'WS_JOINED'
// Users
export const WS_USER = 'WS_USER'
export const WS_USERS = 'WS_USERS'
// Game State
export const WS_GAME_STATE = 'WS_GAME_STATE'
export const WS_VOTE = 'WS_VOTE'

// - - - Websocket actions - - -
export const JOIN_ROOM = 'join_room'
export const BEGIN_VOTE = 'begin_vote'
export const SHOW_RESULTS = 'show_results'
export const RESET = 'reset'
export const VOTE = 'vote'
export const WS_REMOVE_USER = 'WS_REMOVE_USER'
export const REMOVE_USER = 'remove_user'
export const DECIDE_VOTE = 'decide_vote'

/* Websocket action emit listeners
*  The key of each WEBSOCKET_ACTION corresponds to the Redux action identifier --- i.e. WS_CONNECT
*  The value of each WEBSOCKET_ACTION corresponds to the socket.io event listener --- i.e. socket.on('connect')
 */
export const WEBSOCKET_ACTIONS = {
  // Websocket connection status
  // WS_CONNECT: 'connect',
  // WS_DISCONNECT: 'disconnect',
  WS_ERROR: 'error',

  // Websocket subscription status
  WS_SUBSCRIBE: 'subscribed',
  WS_UNSUBSCRIBE: 'unsubscribed',

  // Room
  WS_JOIN_ROOM: 'join_room',
  WS_JOINED: 'joined',

  // User
  WS_USER_LOGGED_IN: 'user_logged_in',
  WS_USER_NOT_LOGGED_IN: 'user_not_logged_in',
  WS_REMOVE_USER: 'remove_user',

  // Room users
  WS_USER: 'user',
  WS_USERS: 'users',

  // Game State
  WS_GAME_STATE: 'game_state',
  WS_VOTE: 'vote',

  // Stories
  WS_STORIES: 'stories',
  WS_STORY: 'story'

}
