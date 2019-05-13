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
  REMOVE_USER,
  DECIDE_VOTE
} from '../constants/action_types'

import { socket } from '../app'
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

export function joinRoom (roomId) {
  return dispatch => {
    dispatch({
      type: FETCHING_ROOM,
      roomId
    })
    socket.emit(JOIN_ROOM, {
      roomId
    })
  }
}

// TODO: Here and other places, find better pattern than always passing roomId
export function beginVoting (roomId, story) {
  socket.emit(BEGIN_VOTE, {
    roomId,
    story
  })
}

export function broadcastVote (roomId, value) {
  socket.emit(VOTE, { roomId, value })
}

export function showResults (roomId) {
  socket.emit(SHOW_RESULTS, { roomId })
}

export function resetGame (roomId) {
  socket.emit(RESET, { roomId })
}

// TODO: Move elsewhere with coming label functions?
export async function broadcastDecision (roomId, owner, repo, issueNumber, decision, votingLabel, storyId) {
  // When votingLabel is present in request, endpoint attempts to remove existing votingLabel from issue
  votingLabel = 'swag:ready' // TODO: get/set programatically
  // TODO: Replace string with custom label
  const body = {
    decision: `swag:${decision}`,
    votingLabel
  }
  const resp = await jsonPost(`/issues/${owner}/${repo}/${issueNumber}`, body)
  if (resp.status === 200) {
    socket.emit(DECIDE_VOTE, {
      roomId,
      storyId,
      decision
    })
  }
  return resp.status
}

export function removeFromRoom (roomId, username) {
  socket.emit(REMOVE_USER, {
    roomId,
    username
  })
}
