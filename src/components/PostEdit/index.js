import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import Button from '../Button'

class PostEdit extends Component {
  state = {
    id: null,
    title: this.props.title || '',
    text: this.props.text || '',
    isPublished: this.props.isPublished || false,
  }
  deletePost = async id => {
    await this.props.deletePost({
      variables: { id },
    })
    this.props.history.replace('/')
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.handlePost(e)}>
          <div className="postedit--root">
            {this.props.id && (
              <Button>
                <a onClick={() => this.deletePost(this.props.id)}>Delete</a>
              </Button>
            )}

            <div className="postedit--content">
              <input
                autoFocus
                className="w-100 pa2 mv2 br2 b--black-20 bw1"
                onChange={e => this.props.onChange({ title: e.target.value })}
                placeholder="Title"
                type="text"
                value={this.props.title}
              />
              <textarea
                autoFocus
                className="textarea"
                cols={50}
                onChange={e => this.props.onChange({ text: e.target.value })}
                placeholder="Text"
                rows={8}
                value={this.props.text}
              />

              <div>
                <input
                  type="checkbox"
                  checked={this.props.isPublished}
                  onChange={e =>
                    this.props.onChange({
                      isPublished: !this.props.isPublished,
                    })
                  }
                />
                Post is isPublished
              </div>

              <div>{this.props.children}</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  withRouter,
)(PostEdit)
