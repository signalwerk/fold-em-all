import React from 'react'
import Code from './Code'
import Image from './Image'
import Title from './Title'

export const NodeSwitch = props => {
  const { attributes, children, isFocused, node } = props

  const src = node.type === 'image'
    ? node.data.get('src')
    : undefined

  return {
    code: <Code {...props} />,
    heading: <Title>{children}</Title>,
    image: <Image src={src} selected={isFocused} {...attributes} />
  }[node.type] || <p>{children}</p>
}

export const MarkSwitch = props => {
  const { children, mark } = props

  return {
    italic: <em>{children}</em>,
    negative: <span className="mark-negative">{children}</span>,
  }[mark.type] || children
}
