import React from 'react'

export default ({ attributes, children }) =>
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
