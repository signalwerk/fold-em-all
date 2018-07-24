import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './index.css'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

export default class Alex extends Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, change) => {
    console.log(event.key)

    if (event.key !== '&') return

    event.preventDefault()
    change.insertText('and')
    return true
  }

  render() {
      return (
        <Editor
          className="Editor"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown} />
      )
  }
}
