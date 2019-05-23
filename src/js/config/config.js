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
export const WEBSOCKET_TIMEOUT = 60000
export const SOCKET_KEEP_ALIVE_POLL_INTERVAL = 29000

// Other config
export const defaultAvatarUrl = 'data:image/png;base64,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'
export const ISSUE_FETCH_TIMEOUT = 3000
export const MEMBERSHIP_FETCH_TIMEOUT = 3000
