import React from 'react'
import { CodeNode } from './components'
import Image from './components/Image'

const MarkHotkey = options => {
  const { type, key } = options
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key !== key) return
      event.preventDefault()

      change.toggleMark(type)
      return true
    }
  }
}

const BlockHotkey = options => {
  const { type, key } = options
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key !== key) return
      const isType = change.value.blocks.some(block => block.type === type)
      event.preventDefault()
      change.setBlocks(isType ? 'paragraph' : type)
      return true
    }
  }
}

export const NodeSwitch = props => {
  const { attributes, children, isFocused, node } = props
  const src = node.type === 'image'
    ? node.data.get('src')
    : undefined

  return {
    code: <CodeNode {...props} />,
    heading: <h1>{children}</h1>,
    image: <Image src={src} selected={isFocused} {...attributes} />
  }[node.type] || <p {...props} />
}

export const MarkSwitch = props => {
  const { children, mark } = props

  return {
    italic: <em>{children}</em>,
    negative: <span className="mark-negative">{children}</span>,
  }[mark.type] || children
}

export const hotkeys = [
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'n', type: 'negative' }),
  BlockHotkey({ key: 'c', type: 'code' }),
  BlockHotkey({ key: 'h', type: 'heading' }),
]
