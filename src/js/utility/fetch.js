import { API_URL } from '../config/config'

// TODO: Use SV/Web as a template to improve these
export async function jsonPost (uri, sendingObj, options = {}) {
  const response = await fetch(API_URL + uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache'
    },
    body: JSON.stringify(sendingObj),
    credentials: 'include'
  })

  let json = {}
  if (response.status === 200) json = await response.json()
  return {
    status: response.status,
    ...json
  }
}

export async function jsonGet (uri, options = {}) {
  const response = await fetch(API_URL + uri, {
    ...options,
    credentials: 'include'
  })

  // TODO: Make consistent / every contract have status and content
  let json = {}
  if (response.status === 200) json = await response.json()
  if (Array.isArray(json)) {
    return {
      status: response.status,
      content: json
    }
  }
  return {
    status: response.status,
    ...json
  }
}
