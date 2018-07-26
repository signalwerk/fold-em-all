import React, { Component, Fragment } from 'react'
import PostTeasers from '../PostTeasers'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'

class ProfilePage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.mydraftsQuery.refetch()
    }
  }

  render() {
    if (this.props.mydraftsQuery.loading || this.props.mypostsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Overview</h1>
        </div>
        <div className="flex justify-between items-center">
          <h2>My Drafts</h2>
        </div>
        <PostTeasers className="drafty" posts={this.props.mydraftsQuery.mydrafts} />

        <div className="flex justify-between items-center">
          <h2>My Posts</h2>
        </div>
        <PostTeasers posts={this.props.mypostsQuery.myposts} />
      </Fragment>
    )
  }
}

const MYDRAFTS_QUERY = gql`
  query MyDraftsQuery {
    mydrafts {
      id
      title
      isPublished
      author {
        name
      }
    }
  }
`

const MYPOSTS_QUERY = gql`
  query MyPostsQuery {
    myposts {
      id
      title
      isPublished
      author {
        name
      }
    }
  }
`

export default compose(
  graphql(MYDRAFTS_QUERY, {
    name: 'mydraftsQuery', // name of the injected prop: this.props.feedQuery...
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(MYPOSTS_QUERY, {
    name: 'mypostsQuery', // name of the injected prop: this.props.feedQuery...
    options: {
      fetchPolicy: 'network-only',
    },
  }),
)(ProfilePage)
