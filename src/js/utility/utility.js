export function openInNewTab (url) {
  var win = window.open(url, '_blank')
  win.focus()
}

// TODO: hardcode for speed
export function fibSequenceArr (n) {
  const sequence = [0]
  let a = 0
  let b = 1
  let res = 1
  for (let i = 2; i <= n; i++) {
    if (a !== b) sequence.push(res)
    res = a + b
    a = b
    b = res
  }
  return sequence
}

export function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')

  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function ownerAndRepoFromUrl (url) {
  let owner = ''
  let repo = ''
  let repoParsed = false
  for (let i = url.length - 1; i > 0; i--) {
    if (!repoParsed) {
      if (url[i] === '/') {
        repoParsed = true
        continue
      }
      repo += url[i]
    } else {
      if (url[i] === '/') {
        break
      }
      owner += url[i]
    }
  }

  owner = owner.split('').reverse().join('')
  repo = repo.split('').reverse().join('')

  return { owner, repo }
}
