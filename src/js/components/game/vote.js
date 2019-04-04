import React from 'react'

import MarkdownGitHub from 'react-markdown-github'

import { broadcastVote, showResults } from '../../actions/room'
import { openInNewTab, fibSequenceArr } from '../../utility/utility'

import './vote.css'

export default class Vote extends React.Component {
  constructor (props) {
    super(props)

    this.broadcastVote = this.broadcastVote.bind(this)
    this.renderVoteOptions = this.renderVoteOptions.bind(this)
    this.showResults = this.showResults.bind(this)
  }

  broadcastVote (value) {
    broadcastVote(this.props.owner, this.props.repo, value)
  }

  renderVoteOptions () {
    return fibSequenceArr(11).map(value => {
      return (
        <button
          key={`vote: ${value}`}
          onClick={() => this.broadcastVote(value)}
          className='vote-option'>{value}</button>
      )
    })
  }

  showResults () {
    showResults(this.props.owner, this.props.repo)
  }

  render () {
    const issue = this.props.issue
    return (
      <React.Fragment>
        <h1>Options</h1>
        <div className='options-wrapper'>
          {this.renderVoteOptions()}
        </div>
        <p>{countUserVotes(this.props.userVotes)} out of {this.props.users && this.props.users.length} votes in.</p>
        {/* TODO: Confirmation */}
        <button onClick={this.showResults}>Close Voting</button>
        <hr />
        <h2>Voting on</h2>
        {issue && (
          <div className='issueList'>

            <div className='issue-box' key={`issue:${issue.title}`}>
              <h2 className='title'>{issue.title}</h2>
              <hr />
              <MarkdownGitHub
                source={issue.body}
              />
              <button className='issue-btn view-in-gh' onClick={() => openInNewTab(issue.html_url)}>View in Github</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

function countUserVotes (userVotes) {
  if (!userVotes) return 0
  let sum = 0
  for (const vote of Object.values(userVotes)) {
    if (vote === 'voted') sum++
  }
  return sum
}
