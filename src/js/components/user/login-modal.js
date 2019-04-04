import React from 'react'
import Modal from 'react-modal'
import connect from 'react-redux/es/connect/connect'

import { loggedIn } from '../../actions/user'
import { LOGIN } from '../../constants/modals'
import { closeModal } from '../../actions/modals'
import { SERVER_URL, OAUTH_CALLBACK_URL, GH_APP_INSTALL_URL } from '../../config/config'
import { socket } from '../../app'

import './login-modal.css'

class LoginModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {},
      disabled: ''
    }

    this.startAuth = this.startAuth.bind(this)
    this.openPopup = this.openPopup.bind(this)
    this.checkPopup = this.checkPopup.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
    const width = 600; const height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${SERVER_URL}${OAUTH_CALLBACK_URL}?socketId=${socket.id}`

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
      this.props.dispatch(closeModal(LOGIN))
    }
  }

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel={`${LOGIN} modal`}
        className='modal-overlay'
      >
        <div className='modal-dialog' tabIndex='-1'>
          <div className='modal-content'>
            <div className='modal-header text-center'>
              <div className='close-wrapper'>
                <a onClick={this.closeModal} className='close' data-dismiss='modal'>&times;</a>
              </div>
              <h2>Log In</h2>
              <p>Please log in or renew your GitHub Oauth.</p>
            </div>
            <div className='modal-body text-center'>
              <button className='github-button' onClick={this.startAuth}>
                <img className='github-image' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />
                <p>Authenticate GitHub</p>
              </button>

              <p>If you haven't already, make sure to install the Planning Poker in the Orgs/Repo that you plan to use it in.</p>
              <button className='github-button' onClick={() => window.open(GH_APP_INSTALL_URL)}>
                <img className='github-image' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />
                <p>Install Planning Poker</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal[LOGIN]
  }
}

export default connect(
  mapStateToProps,
  null
)(LoginModal)
