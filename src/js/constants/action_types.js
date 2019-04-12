// Memberships (Orgs and Repos)
export const FETCHING_MEMBERSHIPS = 'FETCHING_MEMBERSHIPS'
export const MEMBERSHIPS_LISTED = 'MEMBERSHIPS_LISTED'

// Room
export const CREATING_ROOM = 'CREATING_ROOM'
export const FETCHING_ROOM = 'FETCHING_ROOM'
export const UPDATE_VOTE_LABEL = 'UPDATE_VOTE_LABEL'

// =======================
// Modal Management
// =======================
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const OPEN_WITH_CONTENT = 'OPEN_WITH_CONTENT'

// =======================
// Websocket
// =======================
// Websocket connection status
export const WS_CONNECT = 'WS_CONNECT'
export const WS_DISCONNECT = 'WS_DISCONNECT'

// Websocket subscription status
export const SUBSCRIBE = 'WS_SUBSCRIBE'
export const UNSUBSCRIBE = 'WS_UNSUBSCRIBE'

// User
export const USER_LOGIN = 'user_login'
export const WS_USER_LOGGED_IN = 'WS_USER_LOGGED_IN'
export const USER_LOGOUT = 'user_logout'
export const WS_USER_NOT_LOGGED_IN = 'WS_USER_NOT_LOGGED_IN'

// - - - Room - - -
// Issues
export const FETCHING_ISSUES = 'FETCHING_ISSUES'
export const ISSUES = 'ISSUES' // TODO: remove WS issues as now fetching /w REST
export const WS_STORIES = 'WS_STORIES'
export const WS_JOINED = 'WS_JOINED'
export const JOIN_ROOM = 'join_room'
// Labels
export const VOTE_LABEL = 'vote_label'
export const WS_VOTE_LABEL = 'WS_VOTE_LABEL'
// Users
export const WS_USER = 'WS_USER'
export const WS_USERS = 'WS_USERS'
// Game State
export const BEGIN_VOTE = 'begin_vote'
export const SHOW_RESULTS = 'show_results'
export const WS_GAME_STATE = 'WS_GAME_STATE'
export const RESET = 'reset'
// Voting
export const VOTE = 'vote'

/* Websocket action emit listeners
*  The key of each WEBSOCKET_ACTION corresponds to the Redux action identifier --- i.e. WS_CONNECT
*  The value of each WEBSOCKET_ACTION corresponds to the socket.io event listener --- i.e. socket.on('connect')
 */
export const WEBSOCKET_ACTIONS = {
  // Websocket connection status
  WS_CONNECT: 'connect',
  WS_DISCONNECT: 'disconnect',

  // Websocket subscription status
  WS_SUBSCRIBE: 'subscribed',
  WS_UNSUBSCRIBE: 'unsubscribed',

  // Room
  WS_JOIN_ROOM: 'join_room',
  WS_JOINED: 'joined',

  // User
  WS_USER_LOGGED_IN: 'user_logged_in',
  WS_USER_NOT_LOGGED_IN: 'user_not_logged_in',

  // Room users
  WS_USER: 'user',
  WS_USERS: 'users',

  // Game State
  WS_GAME_STATE: 'game_state',

  // Stories
  WS_STORIES: 'stories',

  // Labels
  WS_VOTE_LABEL: 'vote_label'
}
