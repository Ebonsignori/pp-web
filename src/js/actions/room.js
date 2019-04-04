import {
  FETCHING_ROOM,
  JOIN_ROOM,
  VOTE,
  BEGIN_VOTE,
  SHOW_RESULTS,
  RESET,
  VOTE_LABEL,
  UPDATE_VOTE_LABEL
} from '../constants/action_types'

import { socket } from '../app'
import { jsonPost } from '../utility/fetch'

export function joinRoom (owner, repo) {
  return dispatch => {
    dispatch({
      type: FETCHING_ROOM,
      owner: owner,
      repo: repo
    })
    socket.emit(JOIN_ROOM, {
      owner,
      repo
    })
  }
}

export function updateVotingLabel (label) {
  return {
    type: UPDATE_VOTE_LABEL,
    label
  }
}

export function broadcastVotingLabel (owner, repo, label) {
  socket.emit(VOTE_LABEL, {
    owner: owner,
    repo: repo,
    label
  })
}

// TODO: Here and other places, find better pattern than always passing owner and repo
export function beginVoting (owner, repo, issue) {
  socket.emit(BEGIN_VOTE, {
    owner,
    repo,
    issue
  })
}

export function broadcastVote (owner, repo, value) {
  socket.emit(VOTE, { owner, repo, value })
}

export function showResults (owner, repo) {
  socket.emit(SHOW_RESULTS, { owner, repo })
}

export function resetGame (owner, repo) {
  socket.emit(RESET, { owner, repo })
}

// TODO: Move elsewhere with coming label functions?
export async function broadcastDecision (owner, repo, issue, decision, votingLabel) {
  // TODO: Replace string with custom label
  const body = {
    decision: `swag:${decision}`,
    votingLabel
  }
  const resp = await jsonPost(`/issues/${owner}/${repo}/${issue.number}`, body)
  if (resp.status === 200) {
    socket.emit(RESET, { owner, repo })
  }
  return resp.status
}
