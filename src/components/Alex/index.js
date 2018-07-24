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
      case 'title': {
        return <h1>{props.children}</h1>
      }
      case 'image': {
        const src = props.node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }
      default:
        break
    }
  }

  renderMark = props => <MarkSwitch {...props} />
}

const MarkSwitch = props => {
  switch (props.mark.type) {
    case 'bold':
      return <strong>{props.children}</strong>
    case 'negative':
      return <span className="mark-negative">{props.children}</span>
    default:
      break
  }
}
