import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default class PostTeaser extends Component {
  render() {
    return (
      <Fragment>
        <article className="postTeaser--root">
          <Link className="postTeaser--link" to={`/post/${this.props.post.id}`}>
            <div className="postTeaser--inner">
              <div className="postTeaser--hover">→</div>
              <h1>!!!{this.props.post.title}</h1>
              <h3>By {this.props.post.author.name}</h3>
            </div>
          </Link>
        </article>
      </Fragment>
    )
  }
}
