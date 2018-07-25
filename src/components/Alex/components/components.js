import React from 'react'
import styled from 'react-emotion'

export const Button = styled('span')`
  cursor: pointer;
  color: ${props =>
    props.reversed
      ? props.active ? 'white' : '#aaa'
      : props.active ? 'black' : '#ccc'};
`

export const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  font-size: 18px;
  vertical-align: text-bottom;
`

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`
export const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`

export const CodeNode = ({ attributes, children }) =>
  <pre {...attributes}>
    <code>{children}</code>
  </pre>

export class CanvasImage extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const img = this.refs.image

    img.onload = () => {
      this.width = img.width
      this.height = img.height
      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(img, 0, 0)
    }
  }

  render() {
    return (
      <div style={{ outline: '1px solid red'}}>
        <img ref="image" onLoad={this.onImageLoad} src={this.props.src} alt="" />
        <canvas ref="canvas" width={this.width} height={this.height} />
      </div>
    )
  }
}
