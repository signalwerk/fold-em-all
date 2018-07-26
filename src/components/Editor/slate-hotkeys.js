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

export const hotkeys = [
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'n', type: 'negative' }),
  BlockHotkey({ key: 'c', type: 'code' }),
  BlockHotkey({ key: 'h', type: 'heading' }),
]
