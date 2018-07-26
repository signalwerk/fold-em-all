import React from 'react'
import styled from 'react-emotion'

const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  filter: grayscale(100%) contrast(256%) brightness(100%);
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`
export default ({ src }) => <Image  src={src} alt="" className="Image"/>
