import React, { Component, Fragment } from 'react'
import {
  Editor,
} from 'slate-react'

import initialValue from './initialValue'
import './index.css'
import { hotkeys, NodeSwitch, MarkSwitch } from './hotkeys'
import { insertImage,  toggleTitle,  toggleCode } from './changes'
import Toolbar from './components/Toolbar'


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
  onClickInvert = event => {
    event.preventDefault()
    const change = this.state.value.change().toggleMark('negative')
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
          {
            icon: 'separator',
            action: undefined
          },
          {
            icon: 'format_italic',
            action: this.onClickItalic
          },
          {
            icon: 'invert_colors',
            action: this.onClickInvert
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
