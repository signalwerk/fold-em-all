import React from 'react'
import Button from './Button'
import Icon from './Icon'

export default ({ actions }) => {
  return (
    <div className="Toolbar">
      {actions.map(({ icon, action }, index) => icon === 'spacer'
        ? (
          <div
            key={`${index}:${icon}`}
            className="Toolbar__spacer"></div>
        ) : (
          <Button
            className="Toolbar__button"
            key={`${index}:${icon}`}
            onMouseDown={action}>
            <Icon>{icon}</Icon>
          </Button>
        )
      )}
    </div>
  )
}
