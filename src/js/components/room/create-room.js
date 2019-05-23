import React from 'react'
import connect from 'react-redux/es/connect/connect'
import MarkdownGitHub from 'react-markdown-github'
import Toggle from 'react-toggle'
import Loader from 'react-loader-spinner'

import { openInNewTab } from '../../utility/utility'

import './create-room.css'

// TODO: Move import
import 'react-toggle/style.css' // for ES6 modules
import { fetchGithubIssues, setCreatingRoom } from '../../actions/room'
import { jsonPost } from '../../utility/fetch'
import { GH_APP_INSTALL_URL } from '../../config/config'

class CreateRoom extends React.Component {
  constructor (props) {
    super(props)

    // React state
    this.state = {
      repoOwner: 'SalesVista', // TODO: temp
      repoName: 'reqs',
      issueLabel: 'swag:ready',
      issueFetchFieldMissing: false,
      githubAdded: false,
      issuesAddedToRoom: {},
      roomName: '',
      allowGuests: false,
      allowRevote: false,
      useTimer: false,
      revealVotes: false
    }

    this.addGithubIssues = this.addGithubIssues.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  // TODO: Move this logic
  createRoom () {
    (async () => {
      const response = await jsonPost('/rooms', {
        name: this.state.roomName,
        voteValueType: 'fibonacci', // TODO
        allowGuests: this.state.allowGuests,
        allowedUsers: null, // TODO
        revealVotes: this.state.revealVotes,
        useTimer: this.state.useTimer,
        allowRevote: this.state.allowRevote,
        whoCanStart: 'creator', // TODO
        whoCanVote: 'guest', // TODO
        whoCanEnd: 'creator', // TODO
        whoCanRevote: 'creator', // TODO
        whoCanDecide: 'creator', // TODO
        stories: Object.values(this.state.issuesAddedToRoom)
      })

      if (response.status === 201) {
        this.props.dispatch(setCreatingRoom(false))
      }
    })()
  }

  addGithubIssues () {
    if (!this.state.repoOwner || !this.state.repoName || !this.state.issueLabel) {
      this.setState({ issueFetchFieldMissing: true })
    }
    this.props.dispatch(fetchGithubIssues(this.state.repoOwner, this.state.repoName, this.state.issueLabel))
    this.setState({
      issueFetchFieldMissing: false,
      githubAdded: true
    })
  }

  render () {
    let githubIssues
    if (this.state.githubAdded) {
      if (Array.isArray(this.props.issues) && this.props.issues.length > 0) {
        // TODO: Make issues list reusable
        githubIssues = this.props.issues.map((issue) => {
          return (
            <div className='issue-box' key={`issue:${issue.title}`}>
              <h2 className='title'>{issue.title}</h2>
              {this.state.issuesAddedToRoom[issue.number] && <p style={{ color: 'lightgreen' }}>In room</p>}
              <hr />
              <MarkdownGitHub
                source={issue.body}
              />
              {this.state.issuesAddedToRoom[issue.number]
                ? <button className='issue-btn remove' onClick={() => {
                  const oldIssues = { ...this.state.issuesAddedToRoom }
                  oldIssues[issue.number] = undefined
                  this.setState({
                    issuesAddedToRoom: oldIssues
                  })
                }}>Remove from room</button>
                : <button className='issue-btn add' onClick={() => {
                  const oldIssues = { ...this.state.issuesAddedToRoom }
                  oldIssues[issue.number] = {
                    title: issue.title,
                    body: issue.body,
                    sourceUrl: issue.html_url,
                    isFromGithub: true,
                    githubIssueId: issue.id,
                    githubIssueLabel: this.state.issueLabel,
                    githubIssueOwner: this.state.repoOwner,
                    githubIssueRepo: this.state.repoName,
                    githubIssueNumber: issue.number
                  }
                  this.setState({
                    issuesAddedToRoom: oldIssues
                  })
                }}>Add to room</button>
              }
              <button className='issue-btn view-in-gh' onClick={() => openInNewTab(issue.sourceUrl)}>View in Github</button>
            </div>
          )
        })
      }
    }

    let issueDisplay
    if (this.props.fetchingIssues) {
      issueDisplay = <div>
        <p>Fetching issues for {this.state.repoOwner}/{this.state.repoName} ... </p>
        <Loader
          type='Puff'
          color='#00BFFF'
          height='100'
          width='100'
        />
      </div>
    } else if (this.props.issuesFetched) {
      issueDisplay = <div className='issue-list-wrapper'>
        <h2>Github issues for {this.state.repoOwner}/{this.state.repoName}</h2>
        <div className='issue-list'>
          {githubIssues || <li>No issues found with label {this.state.issueLabel}</li>}
        </div>
      </div>
    } else if (!this.props.githubLinked) {
      issueDisplay = <div>You must link your account to Github in the login modal to import Github issues.</div>
    } else {
      issueDisplay = <div className='add-from-github'>
        <label>Repo Owner: (e.g. SalesVista)</label>
        <input value={this.state.repoOwner} onChange={(event) => this.setState({ repoOwner: event.target.value })} />
        <label>Repo Name: (e.g. reqs)</label>
        <input value={this.state.repoName} onChange={(event) => this.setState({ repoName: event.target.value })} />
        <label>With Issue Label: (e.g. swag:ready)</label>
        <input value={this.state.issueLabel} onChange={(event) => this.setState({ issueLabel: event.target.value })} />
        <br />
        {this.state.issueFetchFieldMissing && <p>Please enter all fields</p>}
        <button onClick={this.addGithubIssues}>Add stories from github</button>
      </div>
    }

    return (
      <div className='create-room-wrapper'>
        <h1>Create Room</h1>
        <div className='create-room-options-list'>
          {/* <label>
          Room Name: <input value={this.state.roomName} onChange={(event) => this.setState({
              roomName: event.target.value
            })} />
          </label>

          <label>
            <Toggle
              defaultChecked={this.state.allowGuests}
              onChange={(event) => {
                this.setState({ allowGuests: event.target.checked })
              }} />
            <span>Allow Guests (not implemented)</span>
          </label>

          <label>
            <Toggle
              defaultChecked={this.state.allowRevote}
              onChange={(event) => {
                this.setState({ allowRevote: event.target.checked })
              }} />
            <span>Allow Revote (not implemented)</span>
          </label>

          <label>
            <Toggle
              defaultChecked={this.state.useTimer}
              onChange={(event) => {
                this.setState({ useTimer: event.target.checked })
              }} />
            <span>Use Timer (not implemented)</span>
          </label>

          <label>
            <Toggle
              defaultChecked={this.state.revealVotes}
              onChange={(event) => {
                this.setState({ revealVotes: event.target.checked })
              }} />
            <span>Reveal Votes at end (not implemented)</span>
          </label>

          <p>TODO: Vote value type</p>
          <p>TODO: Users allowed in room</p>
          <p>TODO: Permissions for each phase</p> */}

        </div>
        <h2>Stories</h2>
        {!this.props.issueFetchTimeout && !this.props.issuesFetched && <p>Specify repo to fetch Github issues (stories) from.</p> }
        {this.props.issueFetchTimeout && <h3>Failed to fetch anything for specified repo. Please <span
          className='span-link'
          onClick={() => window.open(GH_APP_INSTALL_URL)}>Install the Planning Poker App</span> for the user or org where the repo is located. </h3>
        }
        {this.props.issuesFetched && <p>Don't see any issues? <span
          className='span-link'
          onClick={() => window.open(GH_APP_INSTALL_URL)}>Install the Planning Poker App</span> for your repo.</p>
        }
        {issueDisplay}
        <br />
        <button className='create-room-btn' onClick={this.createRoom}>Create Room</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingIssues: state.room.fetchingIssues,
    issuesFetched: state.room.issuesFetched,
    issueFetchTimeout: state.room.issueFetchTimeout,
    issues: state.room.issues,
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    githubLinked: state.user.githubLinked
  }
}

export default connect(
  mapStateToProps,
  null
)(CreateRoom)
