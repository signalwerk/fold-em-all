import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import PostEdit from '../PostEdit'

class PostCreate extends Component {
  state = {
    post: {
      title: '',
      isPublished: true,
      sections: [{}, {}, {}, {}, {}, {}, {}, {}],
    },
  }

  render() {
    return (
      <Fragment>
        <h2>Create Post sh</h2>

        <PostEdit
          title={this.state.post.title}
          sections={this.state.post.sections}
          isPublished={this.state.post.isPublished}
          handlePost={this.handlePost}
          onChange={e =>
            this.setState({
              event: Object.assign(this.state.post, e),
            })
          }
        >
          <div className="form--segment">
            <Link className="button" to={`/`}>
              Abbrechen
            </Link>
            &nbsp; &nbsp; &nbsp;
            <input
              className={`button`}
              disabled={!this.state.post.title}
              type="submit"
              value="erstellen"
            />
          </div>
        </PostEdit>
      </Fragment>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, text, isPublished, sections } = this.state.event
    await this.props.createPostMutation({
      variables: {
        isPublished,
        title,
        sections,
      },
    })
    this.props.history.replace('/')
  }
}

const POST_CREATE_MUTATION = gql`
  mutation createPostMutation(
    $isPublished: Boolean!
    $title: String!
    $sections: [Json!]
  ) {
    createPost(isPublished: $isPublished, title: $title, sections: $sections) {
      id
      isPublished
      title
      sections
    }
  }
`

const PostCreateWithMutation = graphql(POST_CREATE_MUTATION, {
  name: 'createPostMutation', // name of the injected prop: this.props.createDraftMutation...
})(PostCreate)

export default withRouter(PostCreateWithMutation)
