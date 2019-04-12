import React from 'react'
import { connect } from 'react-redux'

import { setCreatingRoom } from '../../actions/room'
import { WEB_URL } from '../../config/config'
import { jsonGet } from '../../utility/fetch'

class UserRooms extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      userRooms: []
    }

    this.getUserRooms = this.getUserRooms.bind(this)
    this.getUserRooms()
  }

  getUserRooms () {
    (async () => {
      const response = await jsonGet('/rooms/created')
      if (response.status === 200) {
        this.setState({ userRooms: response.content })
      }
      // TODO: handle error
    })()
  }

  render () {
    let userRooms = <p>You have no rooms, please create one.</p>
    if (Array.isArray(this.state.userRooms) && this.state.userRooms.length > 0) {
      userRooms = this.state.userRooms.map(room => {
        return (
          <div className='user-rooms-list-item' key={`room: ${room.id}`}>
            <h2>Name: {room.name}</h2>
            <ul>
              <li>Join room url: <a href={`${WEB_URL}/?join=${room.id}`}>{`${WEB_URL}/?join=${room.id}`}</a></li>
            </ul>
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        <h2>Your Rooms</h2>
        <div className='user-rooms-list'>
          {userRooms}
        </div>
        <button onClick={() => this.props.dispatch(setCreatingRoom(true))}>Create new room </button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { }
}

export default connect(
  mapStateToProps,
  null
)(UserRooms)
