import React from 'react'

import MarkdownGitHub from 'react-markdown-github'

import { broadcastDecision } from '../../actions/room'
import { openInNewTab } from '../../utility/utility'

// import './results.css'

export default class Results extends React.Component {
  constructor (props) {
    super(props)

    this.broadcastDecision = this.broadcastDecision.bind(this)
    this.determineVoteResults = this.determineVoteResults.bind(this)
    this.renderDecisionBtns = this.renderDecisionBtns.bind(this)
  }

  determineVoteResults () {
    const tally = {}
    const voteResults = Object.entries(this.props.userVotes).map(entry => {
      const user = this.props.users.find(u => u.username === entry[0])
      const choiceKey = String(entry[1])
      if (!tally[choiceKey]) tally[choiceKey] = 0
      tally[choiceKey] = Number(tally[choiceKey]) + 1
      if (user && Array.isArray(user.photos) && user.photos.length > 0) {
        return (
          <div className='voter-wrapper' key={`voter: ${user.username}`}>
            <div
              className={`ava${this.props.userVotes[user.username] === 'voted' ? ' voted' : ''}`}>
              <img src={user.photos[0] && user.photos[0].value} />
            </div>
            <span>Chose: {entry[1]}</span>
          </div>

        )
      }
    })

    return { voteResults, tally }
  }

  renderDecisionBtns (tally) {
    const sortedTallies = Object.entries(tally).sort((e1, e2) => e1[0] - e2[0])
    return sortedTallies.map(entry => {
      return (
        <div className='decision-wrapper' key={`decision: ${entry[0]}`}>
          <button onClick={() => this.broadcastDecision(entry[0])}>Apply swag:{entry[0]} to Issue</button>
          <span>({entry[1]} votes) </span>
        </div>
      )
    })
  }

  broadcastDecision (decision) {
    broadcastDecision(this.props.owner, this.props.repo, this.props.issue, decision, this.props.votingLabel)
  }

  // reset () {
  //   reset(this.props.owner, this.props.repo)
  // }

  render () {
    const { voteResults, tally } = this.determineVoteResults()
    const decisionButtons = this.renderDecisionBtns(tally)

    const issue = this.props.issue
    return (
      <React.Fragment>
        <h1>Results</h1>
        <div className='results-container'>
          {voteResults && voteResults}
        </div>
        <div className='decision-btns-container'>
          {decisionButtons && decisionButtons}
        </div>
        <hr />
        <h2>Deciding on</h2>
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
