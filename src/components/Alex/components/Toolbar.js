import React from 'react'
import Button from './Button'
import Icon from './Icon'

export default ({ actions }) => {
  return (
    <div className="Toolbar">
      {actions.map(({ icon, action}) => icon === 'spacer'
        ? (
          <div className="Toolbar__spacer"></div>
        ) : (
          <Button key={icon} onMouseDown={action}>
            <Icon>{icon}</Icon>
          </Button>
        )
      )}
    </div>
  )
}
