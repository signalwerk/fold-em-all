import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'

export default class Alex extends Component {

  render() {
    return (
      <Fragment >
        <Editor
          value={this.props.value}
          onBlur={json =>
            this.store(json)
          }
          saveImage={(base64, cb) =>
            this.save(base64, cb)
          }
        />
      </Fragment >
    )
  }
}
