import React from 'react'
import styled from 'react-emotion'
import Menu from './Menu'
import Button from './Button'
import Icon from './Icon'

const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

export default ({ actions }) => {
  return (
    <Toolbar>
      {actions.map(({ icon, action}) => (
        <Button onMouseDown={action}>
          {
            icon === 'separator'
            ? <div className="separator"></div>
            : <Icon>{icon}</Icon>
          }

        </Button>
      ))}
    </Toolbar>
  )
}
