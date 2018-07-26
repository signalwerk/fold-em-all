import { Editor as SlateEditor, getEventRange, getEventTransfer } from 'slate-react'
import SoftBreak from 'slate-soft-break'
import React, { Component } from 'react'
import isUrl from 'is-url'
import { hotkeys, NodeSwitch, MarkSwitch } from '../hotkeys'
import { insertImage, toggleTitle, toggleCode } from '../changes'
import { isImage } from '../helpers'
import Toolbar from './Toolbar'
import './Editor.css'

const plugins = [
  ...hotkeys,
  SoftBreak({
    onlyIn: ['code']
  })
]

export default class Editor extends Component {
  state = {
    value: this.props.value,
    active: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.active !== prevState.active
      ? { active: nextProps.active }
      : null
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onDropOrPaste = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type === 'drop') return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime !== 'image') continue

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

  onDoneClicked = event => {
    this.props.onDoneCallback()
    this.setState({
      active: false
    })
  }

  renderNode = props => <NodeSwitch {...props} />
  renderMark = props => <MarkSwitch {...props} />

  renderToolbar = () => {
    return (
      <Toolbar actions={[
        { icon: 'title', action: this.toggleBlock(toggleTitle) },
        { icon: 'code', action: this.toggleBlock(toggleCode) },
        { icon: 'image', action: this.onClickImage },
        { icon: 'spacer', action: undefined },
        { icon: 'format_italic', action: this.toggleMark('italic') },
        { icon: 'invert_colors', action: this.toggleMark('negative') },
        { icon: 'spacer', action: undefined },
        { icon: 'done', action: this.onDoneClicked },
      ]} />
    )
  }

  renderEditor = () => {
    return (
      <SlateEditor
        className="Editor"
        plugins={plugins}
        placeholder="Enter some text..."
        value={this.state.value}
        autoFocus={false}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onDrop={this.onDropOrPaste}
        onPaste={this.onDropOrPaste}
        readOnly={!this.state.active}
        renderNode={this.renderNode}
        renderMark={this.renderMark} />
    )
  }

  render() {
    const className = `Editor__wrapper${
      this.props.active
        ? ' Editor__wrapper--active'
        : ''}`

    return (
      <div className={className} >
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }
}
