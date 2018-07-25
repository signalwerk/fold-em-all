import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'

import './index.css'
import initialValue from './initialValue'
import { Toolbar, Button, Icon } from './components'

import { hotkeys, NodeSwitch, MarkSwitch } from './hotkeys'

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

  renderNode = props => <NodeSwitch {...props} />
  renderMark = props => <MarkSwitch {...props} />
}
