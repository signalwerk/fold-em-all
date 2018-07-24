import React, { Component, Fragment } from 'react'
import Event from '../Event'
import { Link, NavLink } from 'react-router-dom'
import { orderEventsByPerformedAt } from '../../helper/orderHelper'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class Events extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.eventQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewEvent()
  }

  render() {
    if (this.props.eventQuery.loading) {
      return (
        <div className="loading">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    let orderedEvents = orderEventsByPerformedAt(this.props.eventQuery.events)

    return (
      <Fragment>
        <div className="events--root">
          <div className="events--header">
            <Link to="/events/create" className="button right">
              Hinzufügen
            </Link>
            <h2>Events</h2>
          </div>

          <div className="events--content">
            {orderedEvents &&
              orderedEvents.map(event => (
                <NavLink
                  activeClassName="active"
                  className="events--link"
                  to={`/events/${event.id}`}
                >
                  <Event
                    key={event.id}
                    id={event.id}
                    performedAt={event.performedAt}
                    text={event.text}
                    refresh={() => this.props.eventQuery.refetch()}
                  />
                </NavLink>
              ))}
          </div>
        </div>
      </Fragment>
    )
  }
}

const EVENT_QUERY = gql`
  query EventQuery {
    events {
      id
      isPublished
      performedAt
      text
      author {
        name
      }
    }
  }
`
const EVENT_SUBSCRIPTION = gql`
  subscription EventSubscription {
    eventSubscription {
      node {
        id
        isPublished
        performedAt
        text
        author {
          name
        }
      }
    }
  }
`

export default graphql(EVENT_QUERY, {
  name: 'eventQuery', // name of the injected prop: this.props.eventQuery...
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewEvent: params => {
        return props.eventQuery.subscribeToMore({
          document: EVENT_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
            const newEvent = subscriptionData.data.eventSubscription.node
            if (prev.events.find(event => event.id === newEvent.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              events: [...prev.events, newEvent],
            })
          },
        })
      },
    }),
})(Events)
