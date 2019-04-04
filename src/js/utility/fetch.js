import { SERVER_URL } from '../config/config'

// TODO: Use SV/Web as a template to improve these
export async function jsonPost (uri, sendingObj, options = {}) {
  const response = await fetch(SERVER_URL + uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache'
    },
    body: JSON.stringify(sendingObj),
    credentials: 'include'
  })

  console.log(response)

  const json = await response.json()
  return {
    status: response.status,
    ...json
  }
}

export async function jsonGet (uri, options = {}) {
  const response = await fetch(SERVER_URL + uri, {
    ...options,
    credentials: 'include'
  })
  const json = await response.json()
  return {
    status: response.status,
    ...json
  }
}
