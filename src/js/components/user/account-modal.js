import React from 'react'
import Modal from 'react-modal'
import connect from 'react-redux/es/connect/connect'

import { loggedIn } from '../../actions/user'
import { ACCOUNT } from '../../constants/modals'
import { closeModal } from '../../actions/modals'
import { API_URL, GITHUB_OAUTH_URL } from '../../config/config'
import { socket } from '../../app'

import './account-modal.css'
import Login from './account/Login'
import Register from './account/Register'

class AccountModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {},
      disabled: '',
      isRegistering: false
    }

    this.startAuth = this.startAuth.bind(this)
    this.openPopup = this.openPopup.bind(this)
    this.checkPopup = this.checkPopup.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setRegistering = this.setRegistering.bind(this)
  }

  // Set listener for Github auth "ok" from backend
  afterOpenModal () {
    socket.on('authenticate-github', profile => {
      console.log('Authenticated! Closing popup')
      this.popup.close()
      this.setState({ profile })
    })
  }

  // When popup is closed, login will no longer be disabled
  checkPopup () {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: '' })
        this.closeModal()
        this.props.dispatch(loggedIn(this.state.profile))
      }
    }, 1000)
  }

  // Open oauth in separate window
  openPopup () {
    const width = 600
    const height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}${GITHUB_OAUTH_URL}?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth () {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({ disabled: 'disabled' })
    }
  }

  closeModal () {
    if (!this.state.disabled) {
      this.props.dispatch(closeModal(ACCOUNT))
    }
  }

  setRegistering (isRegistering) {
    this.setState({ isRegistering })
  }

  render () {
    let body
    if (this.props.loggedIn) {
      body = <React.Fragment>
        <h3>Hello {this.props.username}</h3>
        {this.props.githubLinked ? 'Your github account is linked.'
          : <button className='github-button' onClick={this.startAuth}>
            <img className='github-image' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />
            <p>
              Link your GitHub
            </p>
          </button>}
      </React.Fragment>
    } else if (this.state.isRegistering) {
      body = <React.Fragment>
        <Register dispatch={this.props.dispatch} setRegistering={this.setRegistering} />
        <button onClick={() => this.setRegistering(false)}>
          Go to Login
        </button>
      </React.Fragment>
    } else {
      body = <React.Fragment>
        <Login dispatch={this.props.dispatch} />
        <button onClick={() => this.setRegistering(true)}>
          Go to Register
        </button>
      </React.Fragment>
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel={`${ACCOUNT} modal`}
        className='modal-overlay'>
        <div className='modal-dialog' tabIndex='-1'>
          <div className='modal-content'>
            <div className='modal-header text-center'>
              <div className='close-wrapper'>
                <a onClick={this.closeModal} className='close' data-dismiss='modal'>×</a>
              </div>
              <h2>{this.props.loggedIn ? 'Account' : 'Login or Register'}</h2>
            </div>
            <div style={{ padding: '25px 0' }} className='modal-body text-center'>
              {body}
              {/* <p>If you haven't already, make sure to install the Planning Poker in the Orgs/Repo that you plan to use it in.</p>
                                                                      <button className='github-button' onClick={() => window.open(GH_APP_INSTALL_URL)}>
                                                                        <img className='github-image' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />
                                                                        <p>Install Planning Poker</p>
                                                                      </button> */}
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
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    githubLinked: state.user.githubLinked,
    isOpen: state.modal[ACCOUNT]

  }
}

export default connect(
  mapStateToProps,
  null
)(AccountModal)
