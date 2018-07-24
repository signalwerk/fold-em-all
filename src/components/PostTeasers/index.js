import React, { Component, Fragment } from 'react'
import PostTeaser from '../PostTeaser'
import './style.css'

export default class PostTeasers extends Component {
  render() {
    return (
      <Fragment>
        {this.props.posts && (
          <div className="postTeasers--root">
            {this.props.posts.map(post => (
              <PostTeaser key={post.id} post={post} />
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}
