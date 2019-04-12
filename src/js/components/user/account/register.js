import React from 'react'
import { loggedIn } from '../../../actions/user'
import { jsonPost } from '../../../utility/fetch'

export default class Register extends React.Component {
  constructor (props) {
    super(props)

    // React state
    this.state = {
      username: '',
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      registerError: undefined
    }

    this.authenticateUser = this.authenticateUser.bind(this)
  }

  authenticateUser (event) {
    event.preventDefault();

    (async () => {
      const response = await jsonPost('/users/register', {
        username: this.state.username,
        givenName: this.state.givenName,
        familyName: this.state.familyName,
        email: this.state.email,
        password: this.state.password
      })

      if (response.status === 200) {
        this.props.setRegistering(false)
        this.props.dispatch(loggedIn(response))
      } else {
        // Corresponds to HTTP status (TODO: for invalid password / account not found)
        this.setState({
          registerError: response.status
        })
      }
    })()
  }

  render () {
    return (
      <form onSubmit={this.authenticateUser} className='login-form'>
        <label>Username </label>
        <input type='text' value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
        <br />

        <label>Given Name </label>
        <input type='text' value={this.state.givenName} onChange={(event) => this.setState({ givenName: event.target.value })} />
        <br />

        <label>Family Name </label>
        <input type='text' value={this.state.familyName} onChange={(event) => this.setState({ familyName: event.target.value })} />
        <br />

        <label>Email </label>
        <input type='email' value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
        <br />

        <label>Password </label>
        <input type='password' value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
        <br />

        <label>Confirm Password </label>
        <input type='password' value={this.state.confirmPassword} onChange={(event) => this.setState({ confirmPassword: event.target.value })} />
        <br />

        {this.state.registerError && <p>An error ocurred when registering. HTTP Status (TODO:) {this.state.registerError}</p>}

        <button type='submit'>Register</button>
      </form>
    )
  }
}
