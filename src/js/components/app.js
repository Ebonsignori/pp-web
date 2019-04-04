import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions/user'
import { listMemberships } from '../actions/memberships'
import { openModal } from '../actions/modals'
import { resetGame } from '../actions/room'

import { LOGIN } from '../constants/modals'

import LoginModal from './user/login-modal'
import Memberships from './user/memberships'
import GameController from './game/game-controller'
import UserVotes from './game/user-votes'

import './app.css'
import '../config/css/global.css'
import '../config/css/modal.css'

import Modal from 'react-modal'
Modal.setAppElement('body')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.listMemberships = this.listMemberships.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  listMemberships () {
    this.props.dispatch(listMemberships())
  }

  login () {
    this.props.dispatch(openModal(LOGIN))
  }

  logout () {
    this.props.dispatch(logout())
  }

  render () {
    let mainContainer = <div className='flex-center'>Login to view repos.</div>
    let dash = <h2>Please login.</h2>
    let resetBtn = null
    if (this.props.loggedIn) {
      mainContainer = <Memberships />
      dash = <button onClick={this.listMemberships}>Refresh Repos</button>
      if (this.props.roomConnected) {
        mainContainer = <GameController />
        dash = <UserVotes />
        resetBtn = <button onClick={() => resetGame(this.props.owner, this.props.repo)}>Reset Game</button>
      }
    }

    return (
      <React.Fragment>
        <div className='app-grid'>
          <div className='dash-container'>
            {dash}
            {resetBtn}
          </div>
          <div className='login-container'>
            {this.props.loggedIn ? (
              <React.Fragment>
                Hello {this.props.username}
                <img src={this.props.avatar} className='avatar-logo' />
                <button
                  style={{ marginLeft: '15px' }}
                  onClick={this.logout}>Logout</button>
              </React.Fragment>
            )
              : <button onClick={this.login}>Login</button>}
          </div>
          <div className='chat-container' />
          <div className='main-container'>
            {mainContainer}
          </div>
        </div>

        {/* Modals */}
        <LoginModal />

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    roomConnected: state.room.roomConnected,
    username: state.user.username,
    avatar: state.user.avatar,
    owner: state.room.owner,
    repo: state.room.repo
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
