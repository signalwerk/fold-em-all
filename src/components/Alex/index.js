import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'

import './index.css'
import initialValue from './initialValue'

import { hotkeys, NodeSwitch, MarkSwitch } from './hotkeys'
import Toolbar from './components/Toolbar'

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

function toggleTitle(change, src, target) {
  if (target) {
    change.select(target)
  }
  const isTitle = change.value.blocks.some(block => block.type === 'heading')

  change.setBlocks(isTitle ? 'paragraph' : 'heading')
}

function toggleCode(change, src, target) {
  if (target) {
    change.select(target)
  }
  const isCode = change.value.blocks.some(block => block.type === 'code')

  change.setBlocks(isCode ? 'paragraph' : 'code')
}

export default class Alex extends Component {
  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onClickTitle = event => {
    event.preventDefault()
    const change = this.state.value.change().call(toggleTitle)
    this.onChange(change)
  }

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  onClickCode = event => {
    event.preventDefault()
    const change = this.state.value.change().call(toggleCode)
    this.onChange(change)
  }

  renderNode = props => <NodeSwitch {...props} />
  renderMark = props => <MarkSwitch {...props} />

  render() {
    return (
      <Fragment>
        <Toolbar actions={[
          {
            icon: 'title',
            action: this.onClickTitle
          },
          {
            icon: 'code',
            action: this.onClickCode
          },
          {
            icon: 'image',
            action: this.onClickImage
          },
        ]} />
        <Editor
          className="Editor"
          plugins={hotkeys}
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark} />
      </Fragment>
    )
  }
}
