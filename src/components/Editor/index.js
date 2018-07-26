import { Editor as SlateEditor, getEventRange, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import SoftBreak from 'slate-soft-break'
import React, { Component } from 'react'
import hotkeys from './slate-hotkeys'
import { NodeSwitch, MarkSwitch } from './components/switches'
import { toggleTitle, toggleCode } from './slate-changes'
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
    this.props.onDone(this.state.value.toJSON())
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
        { icon: 'image', action: undefined },
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
    const { active } = this.state
    const { index } = this.props

    const className = [`Editor__wrapper`]
    .map(s => `${s}${active ? ' Editor__wrapper--active' : ''}`)
    .map(s => `${s} Editor__wrapper--${index % 2 ? 'left' : 'right'}`)[0]


    return (
      <div className={className} >
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }
}
