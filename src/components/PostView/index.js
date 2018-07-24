import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class PostView extends Component {
  render() {
    let title = this.props.title
    if (!this.props.isPublished) {
      title = `${title} (Draft)`
    }

    return (
      <article className="postView--root">
        <h1>{title}</h1>
        <h3>By {this.props.author.name}</h3>
        <p>{this.props.text}</p>
      </article>
    )
  }
}
