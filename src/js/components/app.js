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

import './app.css'
import '../config/css/global.css'
import '../config/css/modal.css'

import Modal from 'react-modal'
import { jsonGet } from '../utility/fetch'
import CreateRoom from './room/create-room'
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
    let mainContainer = <div className='flex-center'>Login.</div>
    let dash = <h2>Planning Poker (WIP!)</h2>
    let resetBtn = null
    if (this.props.loggedIn || this.props.isGuest) {
      if (this.props.roomConnected) {
        mainContainer = <GameController />
        dash = <UserVotes />
        resetBtn = <button onClick={() => resetGame(this.props.roomId)}>Go back to stories</button>
      } else if (this.props.creatingRoom) {
        mainContainer = <CreateRoom />
      } else {
        mainContainer = <UserRooms />
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
              Hello Guest, {this.props.guestUsername}
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
    roomId: state.room.roomId
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
