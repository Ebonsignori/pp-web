import React from 'react'
import Modal from 'react-modal'
import connect from 'react-redux/es/connect/connect'

// import { jsonGet } from '../../utility/fetch'
// import { loggedIn } from '../../actions/user'
import { closeModal } from '../../actions/modals'
import { JOIN_ROOM } from '../../constants/modals'
import { joinRoom } from '../../actions/room'
import { errorContexts, setErrorContext, clearError } from '../../actions/errors'

import './join-room-modal.css'
import { logout, registerGuest } from '../../actions/user'
import Login from '../user/account/Login'
import errors from '../../constants/socket-errors'

class JoinRoomModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      guestUsername: '',
      invalidGuestUsername: false,
      loggingIn: false
    }

    this.closeModal = this.closeModal.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  closeModal () {
    if (!this.state.disabled) {
      this.props.dispatch(closeModal(JOIN_ROOM))
    }
  }

  joinRoom (asGuest) {
    if (asGuest) {
      this.props.dispatch(clearError)
      if (!this.state.guestUsername) return this.setState({ invalidGuestUsername: true })
      this.props.dispatch(setErrorContext(errorContexts.GUEST_USERNAME))
      registerGuest(this.state.guestUsername).then(() => {
        // TODO: Wait for socket to connect?
        this.props.dispatch(joinRoom(this.props.roomId))
      })
    } else {
      this.props.dispatch(joinRoom(this.props.roomId))
    }
  }

  render () {
    let body = <React.Fragment>
      <p>Join room as user: {this.props.username}?</p>
      <button onClick={() => this.joinRoom()}>Yes</button>
      <button onClick={() => this.props.dispatch(logout())}>No, logout</button>
    </React.Fragment>
    if (!this.props.loggedIn) {
      if (this.state.loggingIn) {
        body = <React.Fragment>
          <Login refresh dispatch={this.props.dispatch} />
          <br />
          <button onClick={() => {
            this.setState({
              loggingIn: false
            })
          }}>Back</button>
        </React.Fragment>
      } else {
        body = <React.Fragment>
          <button onClick={() => {
            this.setState({
              loggingIn: true
            })
          }}>Login</button>
          <p>Or Join Room As Guest, </p>
        Guest Username: <input value={this.state.guestUsername} onChange={(event) => {
            this.setState({ guestUsername: event.target.value })
          }} />
          {this.state.invalidGuestUsername &&
          <div>
            <p>Please enter a valid guest username.</p>
            <button onClick={() => this.setState({ invalidGuestUsername: false })}>Ok</button>
          </div>
          }
          {this.props.errorType === errors.ALREADY_EXISTS &&
          <div>
            <p>That username is already taken.</p>
            <button onClick={() => this.props.dispatch(clearError)}>Ok</button>
          </div>
          }
          <br />
          <button onClick={() => this.joinRoom(true)}>Join as Guest</button>
        </React.Fragment>
      }
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel={`${JOIN_ROOM} modal`}
        className='modal-overlay'
      >
        <div className='modal-dialog' tabIndex='-1'>
          <div className='modal-content'>
            <div className='modal-header text-center'>
              <div className='close-wrapper'>
                <a onClick={this.closeModal} className='close' data-dismiss='modal'>&times;</a>
              </div>
              <h2>Join Room</h2>
            </div>
            <div className='modal-body text-center'>
              {body}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    roomId: state.room.roomId,
    username: state.user.username,
    isOpen: state.modal[JOIN_ROOM],
    errorContext: state.socket.errorContext,
    errorType: state.socket.errorType
  }
}

export default connect(
  mapStateToProps,
  null
)(JoinRoomModal)
