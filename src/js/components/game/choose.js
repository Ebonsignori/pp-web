import React from 'react'
import { connect } from 'react-redux'

import Loader from 'react-loader-spinner'
import MarkdownGitHub from 'react-markdown-github'

import { updateVotingLabel, broadcastVotingLabel, beginVoting } from '../../actions/room'
import { openInNewTab } from '../../utility/utility'

import './choose.css'

class Choose extends React.Component {
  constructor (props) {
    super(props)

    this.broadcastVotingLabel = this.broadcastVotingLabel.bind(this)
    this.selectIssue = this.selectIssue.bind(this)
  }

  selectIssue (issue) {
    beginVoting(this.props.owner, this.props.repo, issue)
  }

  broadcastVotingLabel () {
    broadcastVotingLabel(this.props.owner, this.props.repo, this.props.votingLabel)
  }

  render () {
    let slug = `${this.props.owner}/${this.props.repo}`
    let issuesList
    if (Array.isArray(this.props.issues) && this.props.issues.length > 0) {
      issuesList = this.props.issues.map((issue) => {
        return (
          <div className='issue-box' key={`issue:${issue.title}`}>
            <h2 className='title'>{issue.title}</h2>
            <hr />
            <MarkdownGitHub
              source={issue.body}
            />
            <button className='issue-btn vote' onClick={() => this.selectIssue(issue)}>Vote!</button>
            <button className='issue-btn view-in-gh' onClick={() => openInNewTab(issue.html_url)}>View in Github</button>
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        {/* TODO: Loader */}
        {!this.props.roomConnected || !this.props.issuesFetched ? (
          <div className='flex-center'>
            <p>Fetching issues for {slug} ... </p>
            <Loader
              type='Puff'
              color='#00BFFF'
              height='100'
              width='100'
            />
          </div>
        ) : (
          <React.Fragment>
            <h3>Issues for {slug}</h3>
            <p>Is an issues missing? Try adding the <b>{this.props.votingLabel}</b> label to it in GitHub.</p>
            <input onChange={(e) => {
              // TODO: Validate
              this.props.dispatch(updateVotingLabel(e.target.value))
            }} value={this.props.votingLabel} /> <button onClick={this.broadcastVotingLabel}>Change voting label</button>
            <div className='issueList'>
              {/* TODO: programmatically show/set swag label. */}
              {issuesList || <li>No issues with label 'swag-ready'</li>}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const room = state.room
  return {
    owner: room.owner,
    repo: room.repo,
    roomConnected: room.roomConnected,
    issuesFetched: room.issuesFetched,
    issues: room.issues,
    votingLabel: room.votingLabel
  }
}

export default connect(
  mapStateToProps,
  null
)(Choose)
