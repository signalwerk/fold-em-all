import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './index.css'

const CodeNode = ({ attributes, children }) =>
  <pre {...attributes}>
      <code>{children}</code>
  </pre>

const BoldMark = ({ children }) => <strong>{children}</strong>

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
    if (!event.ctrlKey) return
    switch(event.key) {
      case 'b': {
        event.preventDefault()
        change.toggleMark('bold')
        return true
      }
      case 'c': {
        const isCode = change.value.blocks.some(block => block.type === 'code')
        event.preventDefault()
        change.setBlocks(isCode ? 'paragraph' : 'code')
        return true
      }
      default:
        break
    }


  }

  render() {
      return (
        <Editor
          className="Editor"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark} />
      )
  }

  renderNode = props => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props}/>
      default:
        break
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props}/>
      default:
        break
    }
  }
}
