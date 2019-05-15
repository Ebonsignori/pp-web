import React from 'react'
import { connect } from 'react-redux'

import Loader from 'react-loader-spinner'
import MarkdownGitHub from 'react-markdown-github'

import { beginVoting } from '../../actions/room'
import { openInNewTab } from '../../utility/utility'

import './choose.css'

class Choose extends React.Component {
  constructor (props) {
    super(props)

    this.selectStory = this.selectStory.bind(this)
  }

  selectStory (story) {
    beginVoting(this.props.roomId, story)
  }

  render () {
    let unvotedStories
    if (Array.isArray(this.props.stories) && this.props.stories.length > 0) {
      unvotedStories = this.props.stories.map((story) => {
        if (!story.voteValue) {
          return (
            <div className='story-box' key={`story:${story.title}`}>
              <h2 className='title'>{story.title}</h2>
              <hr />
              <MarkdownGitHub
                source={story.body}
              />
              <button className='story-btn vote' onClick={() => this.selectStory(story)}>Vote!</button>
              {/* TODO: only view in github when github issue */}
              <button className='story-btn view-in-gh' onClick={() => openInNewTab(story.sourceUrl)}>View in Github</button>
            </div>
          )
        }
        return null
      })
    }

    let votedStories
    if (Array.isArray(this.props.stories) && this.props.stories.length > 0) {
      votedStories = this.props.stories.map((story) => {
        if (story.voteValue) {
          return (
            <div className='story-box' key={`story:${story.title}`}>
              <h2 className='title'>{story.title}</h2>
              <hr />
              <b>swag:{story.voteValue}</b> applied
              <hr />
              {/* TODO: only view in github when github issue */}
              <button className='story-btn view-in-gh' onClick={() => openInNewTab(story.sourceUrl)}>View in Github</button>
            </div>
          )
        }
        return null
      })
    }

    const hasUnvotedStories = unvotedStories ? unvotedStories.find(val => val !== null) : false
    const hasVotedStories = votedStories ? votedStories.find(val => val !== null) : false

    return (
      <React.Fragment>
        {/* TODO: Loader */}
        {!this.props.roomConnected ? (
          <div className='flex-center'>
            <p>Fetching stories for room... </p>
            <Loader
              type='Puff'
              color='#00BFFF'
              height='100'
              width='100'
            />
          </div>
        ) : (
          <React.Fragment>
            <h3>Unswagged Stories</h3>
            <div className='stories-list'>
              {/* TODO: programmatically show/set swag label. */}
              {hasUnvotedStories ? unvotedStories : <li>No stories remain in this room.</li>}
            </div>
            <h3>Swagged Stories</h3>
            <div className='stories-list'>
              {hasVotedStories ? votedStories : <li>You haven't voted on any stories in this room.</li>}
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
    roomId: room.roomId,
    roomConnected: room.roomConnected,
    stories: room.stories,
    votingLabel: room.votingLabel,
    users: room.users
  }
}

export default connect(
  mapStateToProps,
  null
)(Choose)
