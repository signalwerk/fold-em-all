import React from 'react'
import styled from 'react-emotion'

export default styled('div')`
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`
