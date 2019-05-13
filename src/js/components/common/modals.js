import React from 'react'
import Modal from 'react-modal'
import connect from 'react-redux/es/connect/connect'

import { NOTIFICATION, CONFIRMATION } from '../../constants/modals'
import { closeModal } from '../../actions/modals'

import './modals.css'

class UnconnectedNotificationModal extends React.Component {
  constructor (props) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    this.props.dispatch(closeModal(NOTIFICATION))
  }

  render () {
    const content = this.props.content || {}
    return (
      <Modal
        isOpen={this.props.isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel={`${NOTIFICATION} modal`}
        className='modal-overlay'>
        <div className='modal-dialog' tabIndex='-1'>
          <div className='modal-content'>
            <div className='modal-header text-center'>
              <div className='close-wrapper'>
                <a onClick={this.closeModal} className='close' data-dismiss='modal'>×</a>
              </div>
              <h2>{content.heading}</h2>
            </div>
            <div style={{ padding: '25px 0' }} className='modal-body text-center'>
              {content.body}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.modal.content,
    isOpen: state.modal[NOTIFICATION]
  }
}

export const NotificationModal = connect(
  mapStateToProps,
  null
)(UnconnectedNotificationModal)

class UnconnectedConfirmationModal extends React.Component {
  constructor (props) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    this.props.dispatch(closeModal(CONFIRMATION))
  }

  render () {
    const content = this.props.content || {}
    return (
      <Modal
        isOpen={this.props.isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel={`${CONFIRMATION} modal`}
        className='modal-overlay'>
        <div className='modal-dialog' tabIndex='-1'>
          <div className='modal-content'>
            <div className='modal-header text-center'>
              <div className='close-wrapper'>
                <a onClick={this.closeModal} className='close' data-dismiss='modal'>×</a>
              </div>
              <h2>{content.heading}</h2>
            </div>
            <div style={{ padding: '25px 0' }} className='modal-body text-center'>
              {content.body}
              <div style={{ marginTop: '15px' }}>
                <button onClick={() => {
                  content.onConfirm()
                  this.closeModal()
                }}>{content.confirm || 'Yes'}</button>
                &nbsp;
                <button onClick={() => {
                  if (content.onDeny) content.onDeny()
                  this.closeModal()
                }}>{content.deny || 'No'}</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps2 = (state) => {
  return {
    content: state.modal.content,
    isOpen: state.modal[CONFIRMATION]
  }
}

export const ConfirmationModal = connect(
  mapStateToProps2,
  null
)(UnconnectedConfirmationModal)
