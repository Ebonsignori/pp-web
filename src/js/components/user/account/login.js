import React from 'react'
import { loggedIn } from '../../../actions/user'
import { jsonPost } from '../../../utility/fetch'

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    // React state
    this.state = {
      username: '',
      password: '',
      loginError: undefined // Corresponds to HTTP status 404 for account not found 403 for bad password
    }

    this.login = this.login.bind(this)
  }

  login (event) {
    event.preventDefault();

    (async () => {
      const response = await jsonPost('/users/login', {
        username: this.state.username,
        password: this.state.password
      })

      if (response.status === 200) {
        this.props.dispatch(loggedIn(response))
      } else {
        // Corresponds to HTTP status 404 for account not found 403 for bad password
        this.setState({
          loginError: response.status
        })
      }
    })()
  }

  render () {
    return (
      <div className='login-user-not-logged-in'>
        <form onSubmit={this.login} className='login-form'>
          <label>Username </label>
          <input type='text' value={this.state.username}
            onChange={(event) => this.setState({ username: event.target.value })} />
          <label>Password </label>
          <input type='password' value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })} />
          <br />
          <button type='submit'>Login</button>
        </form>

        {this.state.loginError === 404 && <p>Account not found, please register.</p>}
        {this.state.loginError === 403 && <p>Incorrect Password</p>}
      </div>
    )
  }
}
