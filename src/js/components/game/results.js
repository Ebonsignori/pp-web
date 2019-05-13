import React from 'react'

import MarkdownGitHub from 'react-markdown-github'

import { broadcastDecision } from '../../actions/room'
import { openInNewTab } from '../../utility/utility'

import './results.css'
import { toGuestUsername } from '../../utility/strings';

export default class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      manualSwag: ''
    }

    this.broadcastDecision = this.broadcastDecision.bind(this)
    this.determineVoteResults = this.determineVoteResults.bind(this)
    this.renderDecisionBtns = this.renderDecisionBtns.bind(this)
  }

  determineVoteResults () {
    const tally = {}
    const voteResults = Object.entries(this.props.userVotes).map(entry => {
      const choiceValue = String(entry[1])
      // Tally each choice
      if (!tally[choiceValue]) tally[choiceValue] = 0
      tally[choiceValue] = Number(tally[choiceValue]) + 1
      
      // Display what each user voted for
      let username = entry[0]
      if (username.includes('_')) username = toGuestUsername(username)
      return (
        <div className='voter-wrapper' style={{marginBottom: '5px'}} key={`voter: ${entry[0]}`}>
          <span>{username} chose: {entry[1]}</span>
        </div>

      )
    })

    return { voteResults, tally }
  }

  renderDecisionBtns (tally) {
    const sortedTallies = Object.entries(tally).sort((e1, e2) => e1[0] - e2[0])
    return sortedTallies.map(entry => {
      return (
        <div className='decision-wrapper' style={{ marginBottom: '5px' }} key={`decision: ${entry[0]}`}>
          <button onClick={() => this.broadcastDecision(entry[0])}>Apply swag:{entry[0]} to Github Issue</button>
          <span style={{ marginLeft: '5px' }}>({entry[1]} {Number(entry[1]) > 1 ? 'votes' : 'vote'}) </span>
        </div>
      )
    })
  }

  broadcastDecision (decision) {
    // TODO: Find better way of extracting owner and repo
    // const { owner, repo } = ownerAndRepoFromUrl(this.props.story.sourceUrl)
    broadcastDecision(this.props.roomId, this.props.story.githubIssueOwner, this.props.story.githubIssueRepo, this.props.story.githubIssueNumber, decision, this.props.votingLabel, this.props.story.id)
  }

  render () {
    console.log(this.props.story)
    const { voteResults, tally } = this.determineVoteResults()
    const decisionButtons = this.renderDecisionBtns(tally)

    const story = this.props.story
    return (
      <React.Fragment>
        <h1>Results</h1>
        <div className='results-container'>
          {voteResults && voteResults}
        </div>
        <div className='decision-btns-container'>
          {decisionButtons && decisionButtons}
        </div>
        <div>
          <input onChange={(event) => {
            const newVal = event.target.value
            if (Number.isInteger(Number(newVal))) {
              this.setState({
                manualSwag: event.target.value
              })
            }
          }} value={this.state.manualSwag} />
          <button style={{ marginLeft: '5px' }} onClick={() => {
            if (this.state.manualSwag && Number.isInteger(Number(this.state.manualSwag))) {
              this.broadcastDecision(this.state.manualSwag)
            }
          }}>Apply swag:{this.state.manualSwag}</button>
        </div>
        <hr />
        <h2>Deciding on</h2>
        {story && (
          <div className='story-list'>

            <div className='story-box' key={`story:${story.title}`}>
              <h2 className='title'>{story.title}</h2>
              <hr />
              <MarkdownGitHub
                source={story.body}
              />
              <button className='story-btn view-in-gh' onClick={() => openInNewTab(story.sourceUrl)}>View in Github</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
