import React from 'react'
import { connect } from 'react-redux'

import './user-votes.css'
import { removeFromRoom } from '../../actions/room'
import { toGuestUsername } from '../../utility/strings'
import { openModal } from '../../actions/modals';
import { CONFIRMATION } from '../../constants/modals';
import { readProperty } from '../../utility/localStorage';
import { defaultAvatarUrl } from '../../config/config';
class UserVotes extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hovering: {

      }
    }

    this.renderAvatars = this.renderAvatars.bind(this)
    this.hasRemovePrivileges = this.hasRemovePrivileges.bind(this)
  }

  hasRemovePrivileges () {
    if (this.props.privileges === 'admin' || this.props.privileges === 'creator') return true
    return false
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
    return this.props.users.map(user => {
      let username = user.username
      if (user.isGuest) {
        username = toGuestUsername(user.username) + ' (Guest)'
      }
      const image = user && user.avatarUrl ? user.avatarUrl : defaultAvatarUrl // TODO: Replace default
      return (
        <div
          onMouseEnter={() => {
            if (this.hasRemovePrivileges()) {
              this.setState({
                hovering: {
                  ...this.state.hovering,
                  [username]: true
                }
              })
            }
          }}
          onMouseLeave={() => {
            this.setState({
              hovering: {
                ...this.state.hovering,
                [username]: false
              }
            })
          }}
          onClick={() => {
            console.log(user.username)
            console.log(this.props.loggedInUsername)
            if (this.props.loggedInUsername === user.username) {
              this.props.dispatch(
                openModal(CONFIRMATION, {
                  heading: `Leave Remove`,
                  body: `Are you sure you want to leave this room?`,
                  onConfirm: () => {
                    removeFromRoom(this.props.roomId, user.username)
                  }
                })
              )
              this.setState({
                hovering: {
                  ...this.state.hovering,
                  [username]: false
                }
              })
            } else if (this.hasRemovePrivileges()) {
              this.props.dispatch(
                openModal(CONFIRMATION, {
                  heading: `Kick from Room`,
                  body: `Remove ${username} from the room?`,
                  onConfirm: () => {
                    removeFromRoom(this.props.roomId, user.username)
                  }
                })
              )
              this.setState({
                hovering: {
                  ...this.state.hovering,
                  [username]: false
                }
              })
            }
          }}
          key={`avatar_wrapper: ${user.username}`}
          className='avatar-wrapper'>
          <div className={`ava${this.props.userVotes[user.username] === 'voted' ? ' voted' : ''}`} >
            <img
              className={this.state.hovering[username] ? 'hovering' : ''}
              src={this.state.hovering[username] ? 'https://meic.org/wp-content/uploads/2017/04/red-x.png' : image} />
          </div>
          <p>{username} {this.props.userVotes[user.username] === 'voted' && <React.Fragment>&#10003;</React.Fragment>}</p>
        </div>
      )
    })
  }
}

const mapStateToProps = (state) => {
  const room = state.room
  return {
    users: room.users,
    userVotes: room.gameState && room.gameState.userVotes,
    roomId: room.roomId,
    privileges: room.privileges,
    loggedInUsername: state.user.isGuest ? readProperty('guestUsername') : state.user.username
  }
}

export default connect(
  mapStateToProps,
  null
)(UserVotes)
