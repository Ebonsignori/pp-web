let cache
function updateCache () {
  try {
    let serializedState = window.localStorage.getItem('state')
    // If 'state' isn't initialized in browser storage, create it
    if (!serializedState) {
      serializedState = JSON.stringify({})
      window.localStorage.setItem('state', serializedState)
    }
    cache = JSON.parse(serializedState)
  } catch (err) {
    console.error('Error reading from browser cache')
    console.error(err)
  }
}

// Append or update an object by it's property and value to browser storage
export function upsertProperty (prop, val) {
  if (!cache) updateCache()
  try {
    cache[prop] = val
    window.localStorage.setItem('state', JSON.stringify(cache))
    updateCache()
  } catch (err) {
    console.error('Error writing to browser cache')
    console.error(err)
  }
}

// Read property from browser storage
export function readProperty (prop) {
  if (!cache) updateCache()
  return cache[prop]
}
