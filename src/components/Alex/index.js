import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'
import initialValue from './initialValue'

export default class Alex extends Component {

  render() {
    return (
      <Fragment >
        <Editor
          value={initialValue}
        />
      </Fragment >
    )
  }
}
