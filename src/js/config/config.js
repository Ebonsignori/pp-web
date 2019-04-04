import { convertToKebabCase } from '../utility/strings'

// import identifierJson from './identifier.json'

// ============================================
// Github config
// ============================================
export const GH_APP_NAME = 'Planning Poker'
export const GH_APP_INSTALL_URL = `https://github.com/apps/${convertToKebabCase(GH_APP_NAME)}/installations/new`
export const OAUTH_CALLBACK_URL = '/oauth/github'

// ============================================
// Server config
// ============================================
export let SERVER_URL = 'http://73874bd0.ngrok.io'
// if (identifierJson.environ === 'local') {
//   SERVER_URL = 'http://localhost:3000'
// } else {
//   SERVER_URL = 'TODO: '
// }

// ============================================
// Websocket config
// ============================================
export const WEBSOCKET_TIMEOUT = 10000
