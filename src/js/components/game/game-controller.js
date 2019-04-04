import React from 'react'
import { connect } from 'react-redux'

import Choose from './choose'
import Vote from './vote'
import Results from './results'

class GameController extends React.Component {
  render () {
    return (
      <React.Fragment>
        {renderCurrentStage(this.props.owner, this.props.repo, this.props.gameState, this.props.users, this.props.votingLabel)}
      </React.Fragment>
    )
  }
}

// TODO: move to config
const STAGES = {
  CHOSE: 'choose',
  VOTE: 'vote',
  RESULTS: 'results'
}

function renderCurrentStage (owner, repo, { stage, issue, userVotes }, users, votingLabel) {
  switch (stage) {
    case STAGES.CHOSE:
      return <Choose />
    case STAGES.VOTE:
      return <Vote
        owner={owner}
        repo={repo}
        issue={issue}
        users={users}
        userVotes={userVotes}
      />
    case STAGES.RESULTS:
      return <Results
        owner={owner}
        repo={repo}
        issue={issue}
        users={users}
        userVotes={userVotes}
        votingLabel={votingLabel}
      />
    default:
      return <p>TODO: Something went wrong.</p>
  }
}

const mapStateToProps = (state) => {
  const room = state.room
  return {
    owner: room.owner,
    repo: room.repo,
    gameState: room.gameState,
    users: room.users,
    votingLabel: room.votingLabel
  }
}

export default connect(
  mapStateToProps,
  null
)(GameController)
