import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default class PostTeaser extends Component {
  render() {
    return (
      <Fragment>
        <article className={`postTeaser--root ${this.props.className ? this.props.className : ''}`}>
          <Link className="postTeaser--link" to={`/post/${this.props.post.id}`}>
            <h1><span>!!!{this.props.post.title}</span></h1>
          </Link>
          <h3>By {this.props.post.author.name}</h3> 
        </article>
      </Fragment>
    )
  }
}
