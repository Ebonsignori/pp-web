import React from 'react'
import { connect } from 'react-redux'

import Choose from './choose'
import Vote from './vote'
import Results from './results'

class GameController extends React.Component {
  render () {
    return (
      <React.Fragment>
        {renderCurrentStage(this.props.roomId, this.props.gameState, this.props.users, this.props.votingLabel)}
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

function renderCurrentStage (roomId, { stage, story, userVotes }, users, votingLabel) {
  switch (stage) {
    case STAGES.CHOSE:
      return <Choose />
    case STAGES.VOTE:
      return <Vote
        roomId={roomId}
        story={story}
        users={users}
        userVotes={userVotes}
      />
    case STAGES.RESULTS:
      return <Results
        roomId={roomId}
        story={story}
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
    roomId: room.roomId,
    gameState: room.gameState,
    users: room.users,
    votingLabel: room.votingLabel
  }
}

export default connect(
  mapStateToProps,
  null
)(GameController)
