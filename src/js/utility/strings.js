export function convertToKebabCase (string) {
  return string.replace(/\s+/g, '-').toLowerCase()
}

export function toGuestUsername (username) {
  return username.substr(0, username.indexOf('_'))
}
