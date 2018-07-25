import { Editor as SlateEditor, getEventRange, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'

import React, { Component, Fragment } from 'react'
import isUrl from 'is-url'
import initialValue from '../initialValue'
import '../index.css'
import { hotkeys, NodeSwitch, MarkSwitch } from '../hotkeys'
import { insertImage, toggleTitle, toggleCode } from '../changes'
import { isImage } from '../helpers'
import Toolbar from './Toolbar'

export default class Editor extends Component {
  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onDropOrPaste = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type == 'drop') return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime != 'image') continue

        reader.addEventListener('load', () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }

    if (type === 'text') {
      if (!isUrl(text)) return
      if (!isImage(text)) return
      change.call(insertImage, text, target)
    }
  }

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  toggleBlock = callback => event => {
    event.preventDefault()
    const change = this.state.value.change().call(callback)
    this.onChange(change)
  }

  toggleMark = type => event => {
    event.preventDefault()
    const change = this.state.value.change().toggleMark(type)
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
            action: this.toggleBlock(toggleTitle)
          },
          {
            icon: 'code',
            action: this.toggleBlock(toggleCode)
          },
          {
            icon: 'image',
            action: this.onClickImage
          },
          {
            icon: 'format_italic',
            action: this.toggleMark('italic')
          },
          {
            icon: 'invert_colors',
            action: this.toggleMark('negative')
          },
        ]} />
        <SlateEditor
          className="Editor"
          plugins={hotkeys}
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onDrop={this.onDropOrPaste}
          onPaste={this.onDropOrPaste}
          renderNode={this.renderNode}
          renderMark={this.renderMark} />
      </Fragment>
    )
  }
}
