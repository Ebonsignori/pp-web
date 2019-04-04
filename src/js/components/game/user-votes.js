import React from 'react'
import { connect } from 'react-redux'

import './user-votes.css'

class UserVotes extends React.Component {
  constructor (props) {
    super(props)

    this.renderAvatars = this.renderAvatars.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        <div className='avatar-container'>
          {this.props.users && this.renderAvatars()}
        </div>
      </React.Fragment>
    )
  }

  renderAvatars () {
    return this.props.users.map((user) => {
      if (user && Array.isArray(user.photos) && user.photos.length > 0) {
        return (
          <div
            key={`avatar: ${user.username}`}
            className={`ava${this.props.userVotes[user.username] === 'voted' ? ' voted' : ''}`}>
            <img src={user.photos[0] && user.photos[0].value} />
          </div>
        )
      }
    })
  }
}

const mapStateToProps = (state) => {
  const room = state.room
  return {
    users: room.users,
    userVotes: room.gameState && room.gameState.userVotes
  }
}

export default connect(
  mapStateToProps,
  null
)(UserVotes)
