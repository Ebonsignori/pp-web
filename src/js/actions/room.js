import {
  FETCHING_ROOM,
  JOIN_ROOM,
  VOTE,
  BEGIN_VOTE,
  SHOW_RESULTS,
  RESET,
  CREATING_ROOM,
  ISSUES,
  FETCHING_ISSUES,
  REMOVE_FROM_ROOM
} from '../constants/action_types'

import { socket, store } from '../app'
import { jsonPost, jsonGet } from '../utility/fetch'

export function setCreatingRoom (creatingRoom) {
  return {
    type: CREATING_ROOM,
    creatingRoom
  }
}

export function fetchGithubIssues (owner, repo, label) {
  return async dispatch => {
    dispatch({
      type: FETCHING_ISSUES
    })
    const response = await jsonGet(`/issues/${owner}/${repo}?label=${label}`)
    if (response.status === 200) {
      dispatch({
        type: ISSUES,
        issues: response.content
      })
    } else {
      // TODO: error
      console.error('Error fetching github issues')
    }
  }
}

export function joinRoom (roomId, guestUsername) {
  return dispatch => {
    dispatch({
      type: FETCHING_ROOM,
      roomId,
      guestUsername
    })
    socket.emit(JOIN_ROOM, {
      roomId,
      guestUsername
    })
  }
}

// TODO: Here and other places, find better pattern than always passing roomId
export function beginVoting (roomId, issue) {
  socket.emit(BEGIN_VOTE, {
    roomId,
    issue
  })
}

export function broadcastVote (roomId, value) {
  let guestUsername
  const userStore = store.getState().user
  if (userStore.isGuest) guestUsername = userStore.guestUsername
  socket.emit(VOTE, { roomId, value, guestUsername })
}

export function showResults (roomId) {
  socket.emit(SHOW_RESULTS, { roomId })
}

export function resetGame (roomId) {
  socket.emit(RESET, { roomId })
}

// TODO: Move elsewhere with coming label functions?
export async function broadcastDecision (roomId, owner, repo, issueNumber, decision, votingLabel) {
  votingLabel = 'swag:ready' // TODO: get/set programatically
  // TODO: Replace string with custom label
  const body = {
    decision: `swag:${decision}`,
    votingLabel
  }
  const resp = await jsonPost(`/issues/${owner}/${repo}/${issueNumber}`, body)
  if (resp.status === 200) {
    socket.emit(RESET, { roomId })
  }
  return resp.status
}

export function removeFromRoom (roomId, username) {
  socket.emit(REMOVE_FROM_ROOM, {
    roomId,
    username
  })
}
