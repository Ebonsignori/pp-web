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
