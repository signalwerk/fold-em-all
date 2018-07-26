import React, { Component, Fragment } from 'react'
import PostTeasers from '../PostTeasers'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.postsQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewPosts()
  }

  render() {
    if (this.props.postsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <PostTeasers posts={this.props.postsQuery.posts} />
      </Fragment>
    )
  }
}

const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`
const POSTS_SUBSCRIPTION = gql`
  subscription PostsSubscription {
    postsSubscription {
      node {
        id
        text
        title
        isPublished
        author {
          name
        }
      }
    }
  }
`

export default graphql(POSTS_QUERY, {
  name: 'postsQuery', // name of the injected prop: this.props.postsQuery...
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewPosts: params => {
        return props.postsQuery.subscribeToMore({
          document: POSTS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
            const newPost = subscriptionData.data.postsSubscription.node
            if (prev.posts.find(post => post.id === newPost.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              posts: [...prev.posts, newPost],
            })
          },
        })
      },
    }),
})(Home)
