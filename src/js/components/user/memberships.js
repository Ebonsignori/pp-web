import React from 'react'
import { connect } from 'react-redux'

import { listMemberships } from '../../actions/memberships'
import { joinRoom } from '../../actions/room'
import { GH_APP_INSTALL_URL } from '../../config/config'
import Loader from 'react-loader-spinner'

import './memberships.css'

class Memberships extends React.Component {
  componentDidMount () {
    this.props.dispatch(listMemberships())
  }

  selectRepo (fullName) {
    const namePath = fullName && fullName.split('/') // TODO: Can this be anything other than owner/repo
    const owner = namePath && namePath[0]
    const repo = namePath && namePath[1]
    this.props.dispatch(joinRoom(owner, repo))
  }

  render () {
    let repoList
    if (Array.isArray(this.props.repos) && this.props.repos.length > 0) {
      repoList = this.props.repos.map((repo) => {
        const fullName = repo.full_name
        return (
          <div
            key={`repo-${fullName}`}
            onClick={() => this.selectRepo(fullName)}>
            {fullName}
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        {/* TODO: Loader */}
        {!this.props.membershipsFetched ? (
          <div className='flex-center'>
            <p>Fetching memberships ... </p>
            <Loader
              type='Puff'
              color='#00BFFF'
              height='100'
              width='100'
            />
          </div>
        ) : (
          <React.Fragment>
            <h3>Don't see the repo you're looking for? <span
              className='span-link'
              onClick={() => window.open(GH_APP_INSTALL_URL)}>Install the Planning Poker App</span> for the user or org where the repo is located.</h3>
            <div className='repoList'>
              {repoList || <li>No repos available.</li>}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    membershipsFetched: state.user.membershipsFetched,
    orgs: state.user.orgs,
    repos: state.user.repos
  }
}

export default connect(
  mapStateToProps,
  null
)(Memberships)
