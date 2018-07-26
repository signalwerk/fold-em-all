import React from 'react'
import Button from './Button'
import Icon from './Icon'

const ToolbarButton = ({ icon, action , index }) => (
  <Button
    className={`Toolbar__button Toolbar__button--${icon}`}
    key={`${index}:${icon}`}
    onMouseDown={action}>
    <Icon>{icon}</Icon>
  </Button>
)

const ToolbarSwitch = props => {
  const { icon, action, index } = props
  return {
    spacer: <div key={`${index}:${icon}`} className="Toolbar__spacer"></div>,
    image: <ImageInput icon={icon} action={action} index={index} />
  }[icon] || <ToolbarButton icon={icon} action={action} index={index} />
}

const ImageInput = ({ icon, action , index }) => (
  <Button
    className={`Toolbar__button Toolbar__button--${icon}`}
    key={`${index}:${icon}`}
    onMouseDown={action}>
    <input type="file" onChange={() => { }} />
    <Icon>image</Icon>
  </Button>
)
export default ({ actions }) => {
  return (
    <div className="Toolbar">
      {actions.map(({ icon, action }, index) =>
        <ToolbarSwitch icon={icon} action={action} index={index} />
      )}
    </div>
  )
}
