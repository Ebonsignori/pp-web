import { convertToKebabCase } from '../utility/strings'

// ============================================
// Github config
// ============================================
export const GH_APP_NAME = 'Planning Poker'
export const GH_APP_INSTALL_URL = `https://github.com/apps/${convertToKebabCase(GH_APP_NAME)}/installations/new`
export const GITHUB_OAUTH_URL = '/oauth/github'

// ============================================
// App config
// ============================================
export const WEB_URL = process.env.WEB_URL
export let API_URL = process.env.API_URL

// ============================================
// Websocket config
// ============================================
export const WEBSOCKET_TIMEOUT = 10000
