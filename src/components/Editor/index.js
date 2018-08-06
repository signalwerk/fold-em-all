import { Editor as SlateEditor, getEventRange, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import SoftBreak from 'slate-soft-break'
import React, { Component } from 'react'
import hotkeys from './slate-hotkeys'
import { NodeSwitch, MarkSwitch } from './components/switches'
import { insertImage, toggleTitle, toggleCode } from './slate-changes'
import Toolbar from './components/Toolbar'
import './styles.css'

const plugins = [
  ...hotkeys,
  SoftBreak({
    onlyIn: ['code']
  })
]

export default class Editor extends Component {
  state = {
    value: Value.fromJSON(this.props.value),
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

  onDoneClicked = event => {
    this.props.onDone(this.state.value.toJSON())
    this.setState({
      active: false
    })
  }

  onBlur = event => {
    this.props.onDone(this.state.value.toJSON())
    this.setState({
      active: false
    })
  }

  onImageSubmitted = url => {
    const change = this.state.value.change().call(insertImage, url)
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

  renderToolbar = () => {
    const  { anchorOffset, focusOffset } = this.state.value.selection
    const hasSelection = Math.abs(anchorOffset - focusOffset) !== 0

    return (
      <Toolbar
        hasSelection={hasSelection}
        buttons={[
          { icon: 'title', action: this.toggleBlock(toggleTitle) },
          { icon: 'code', action: this.toggleBlock(toggleCode) },
          { icon: 'image', action: this.onImageSubmitted },
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
        onBlur={this.onBlur}
        onPaste={this.onDropOrPaste}
        readOnly={!this.state.active}
        renderNode={this.renderNode}
        renderMark={this.renderMark} />
    )
  }

  render() {
    const { active } = this.state
    const { index } = this.props


    let className = `Editor__wrapper`
    className += active ? ' Editor__wrapper--active' : ''
    className += ` Editor__wrapper--${index % 2 ? 'left' : 'right'}`


    return (
      <div className={className} >
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }
}
