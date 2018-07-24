import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'

import './index.css'
import initialValue from './initialValue'
import { Toolbar, Button, Icon, Image, CodeNode } from './components'

import hotkeys from './hotkeys'

function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src },
  })
}

const plugins = [
  ...hotkeys
]

export default class Alex extends Component {
  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, change) => {
    if (!event.ctrlKey) return
    switch (event.key) {
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

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  render() {
    return (
      <Fragment>
        <Toolbar>
          <Button onMouseDown={this.onClickImage}>
            <Icon>Image</Icon>
          </Button>
        </Toolbar>
        <Editor
          className="Editor"
          plugins={plugins}
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark} />
      </Fragment>
    )
  }

  renderNode = props => {
    const { attributes, node, isFocused } = props

    switch (node.type) {
      case 'code': {
        return <CodeNode {...props} />
      }
      case 'image': {
        const src = props.node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }
      default:
        break
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      case 'italic':
        return <em>{props.children}</em>
      case 'underline':
        return <u>{props.children}</u>
      default:
        break
    }
  }
}
