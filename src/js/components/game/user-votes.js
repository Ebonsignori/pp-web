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
      const image = user && user.avatarUrl ? user.avatarUrl : 'https://img.icons8.com/ios/100/000000/user-filled.png' // TODO: Replace default
      if (user && user.avatarUrl) {
        return (
          <div
            key={`avatar: ${user.username}`}
            className={`ava${this.props.userVotes[user.username] === 'voted' ? ' voted' : ''}`}>
            <img src={image} />
          </div>
        )
      } else {

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
