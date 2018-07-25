export const insertImage = (change, src, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src },
  })
}

export const toggleTitle = (change, src, target) => {
  if (target) {
    change.select(target)
  }
  const isTitle = change.value.blocks.some(block => block.type === 'heading')

  change.setBlocks(isTitle ? 'paragraph' : 'heading')
}

export const toggleCode = (change, src, target) => {
  if (target) {
    change.select(target)
  }
  const isCode = change.value.blocks.some(block => block.type === 'code')

  change.setBlocks(isCode ? 'paragraph' : 'code')
}
