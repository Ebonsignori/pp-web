import { convertToKebabCase } from '../utility/strings'

// ============================================
// Github config
// ============================================
export const GH_APP_NAME = 'Planning Poker'
export const GH_APP_INSTALL_URL = `https://github.com/apps/${convertToKebabCase(GH_APP_NAME)}/installations/new`
export const OAUTH_CALLBACK_URL = '/oauth/github'

// ============================================
// Server config
// ============================================
export let SERVER_URL = process.env.DEV_URL || 'https://7125f55e.ngrok.io' // TODO: defined default production url

// ============================================
// Websocket config
// ============================================
export const WEBSOCKET_TIMEOUT = 10000
