import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import PostEdit from '../PostEdit'
import Button from '../Button'

class PostEditPage extends Component {
  state = {
    // here we save the changes of the edit
    post: {},
  }

  handleChancel() {
    console.log(this.props.history.length, this.props.history)
    if (this.props.history.length > 1) {
      // this will take you back if there is history
      this.props.history.goBack()
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { post } = this.props.postQuery
    let finalData = Object.assign({}, post, this.state.post)

    return (
      <Fragment>
        <div>
          <h2>Post edit sh</h2>
        </div>

        <PostEdit
          id={finalData.id}
          title={finalData.title}
          text={finalData.text}
          isPublished={finalData.isPublished}
          onChange={e =>
            this.setState({
              post: Object.assign(this.state.post, e),
            })
          }
          handlePost={e => this.updatePost(finalData)}
        >
          <div className="form--segment">
            <Button>
              <a onClick={e => this.handleChancel()}>cancel</a>
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button>
              <a onClick={() => this.updatePost(finalData)}>Speichern</a>
            </Button>
          </div>
        </PostEdit>
      </Fragment>
    )
  }

  deletePost = async id => {
    await this.props.deletePost({
      variables: { id },
    })
    this.props.history.replace('/posts')
  }

  updatePost = async ({ id, isPublished, title, text }) => {
    await this.props.updatePost({
      variables: {
        id,
        isPublished,
        title,
        text,
      },
    })
    this.props.history.replace('/posts')
  }
}

const EVENT_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      isPublished
      title
      text
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $isPublished: Boolean!
    $title: String!
    $text: String!
  ) {
    updatePost(id: $id, isPublished: $isPublished, title: $title, text: $text) {
      id
      isPublished
      title
      text
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(EVENT_QUERY, {
    name: 'postQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(UPDATE_MUTATION, {
    name: 'updatePost',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  withRouter,
)(PostEditPage)
