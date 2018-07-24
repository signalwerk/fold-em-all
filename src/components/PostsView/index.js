import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PostView from '../PostView'

export default class PostsView extends Component {
  render() {
    return (
      <Fragment>
        {this.props.posts &&
          this.props.posts.map(post => (
            <Link to={`/post/${post.id}`}>
              <PostView
                key={post.id}
                title={post.title}
                author={post.author}
                isPublished={post.isPublished}
              />
            </Link>
          ))}
      </Fragment>
    )
  }
}
