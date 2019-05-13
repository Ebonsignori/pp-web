import React from 'react'
import { connect } from 'react-redux'

import { logout, loggedIn } from '../actions/user'
import { listMemberships } from '../actions/memberships'
import { openModal } from '../actions/modals'
import { resetGame } from '../actions/room'

import { ACCOUNT } from '../constants/modals'

import AccountModal from './user/account-modal'
import GameController from './game/game-controller'
import UserVotes from './game/user-votes'
import UserRooms from './user/user-rooms'
import JoinRoomModal from './room/join-room-modal'
import { NotificationModal, ConfirmationModal } from './common/modals'

import './app.css'
import '../config/css/global.css'
import '../config/css/modal.css'

import Modal from 'react-modal'
import { jsonGet } from '../utility/fetch'
import CreateRoom from './room/create-room'
import { STAGES } from '../constants/game'

Modal.setAppElement('body')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.listMemberships = this.listMemberships.bind(this)
    this.openAccountModal = this.openAccountModal.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    (async () => {
      if (!this.props.loggedIn) {
        const response = await jsonGet('/users/logged-in')
        if (response.status === 200) {
          this.props.dispatch(loggedIn(response))
        }
      }
    })()
  }

  listMemberships () {
    this.props.dispatch(listMemberships())
  }

  openAccountModal () {
    this.props.dispatch(openModal(ACCOUNT))
  }

  logout () {
    this.props.dispatch(logout())
  }

  render () {
    let mainContainer = <div className='flex-center'>Please login or register to create a room.</div>
    let dash = <h2>Planning Poker</h2>
    let resetBtn = null
    if (this.props.loggedIn || this.props.isGuest) {
      if (this.props.roomConnected) {
        mainContainer = <GameController />
        dash = <UserVotes />
        console.log(this.props.gameState)
        if (this.props.gameState.stage !== STAGES.CHOOSE) {
          resetBtn = <button onClick={() => resetGame(this.props.roomId)}>Go back to stories</button>
        }
      } else if (this.props.creatingRoom) {
        mainContainer = <CreateRoom />
      } else {
        if (this.props.isGuest) {
          mainContainer = <React.Fragment>
            <div className='flex-center'><h2>You are a guest user</h2></div>
            <div className='flex-center'>To create your own room, logout and register an account.</div>
          </React.Fragment>
        } else {
          mainContainer = <UserRooms />
        }
      }
      // dash = <button onClick={this.listMemberships}>Refresh Repos</button>
    }

    return (
      <React.Fragment>
        <div className='app-grid'>
          <div className='dash-container'>
            {dash}
            {resetBtn}
          </div>
          <div className='login-container'>
            {this.props.isGuest
              ? <React.Fragment>
              Hello Guest, {this.props.username}
                <button
                  style={{ marginLeft: '15px' }}
                  onClick={this.logout}>Logout</button>
              </React.Fragment>
              : this.props.loggedIn ? (
                <React.Fragment>
                Hello {this.props.username}
                  <img src={this.props.avatarUrl} className='avatar-logo' />
                  <button
                    style={{ marginLeft: '15px' }}
                    onClick={this.logout}>Logout</button>
                  <button onClick={this.openAccountModal}>View Account</button>
                </React.Fragment>
              )
                : <button onClick={this.openAccountModal}>Login</button>}
          </div>
          <div className='chat-container' />
          <div className='main-container'>
            {mainContainer}
          </div>
        </div>

        {/* Modals */}
        <AccountModal />
        <JoinRoomModal />
        <NotificationModal />
        <ConfirmationModal />

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    creatingRoom: state.room.creatingRoom,
    loggedIn: state.user.loggedIn,
    roomConnected: state.room.roomConnected,
    isGuest: state.user.isGuest,
    guestUsername: state.user.guestUsername,
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    roomId: state.room.roomId,
    gameState: state.room.gameState
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
