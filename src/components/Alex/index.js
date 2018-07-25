import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'
import { value1, value2} from './initialValue'

export default class Alex extends Component {
  state = {
    sections: [
      {
        value: value1,
        active: false,
      },
      {
        value: value2,
        active: false,
      },
      {
        value: value2,
        active: false,
      },
      {
        value: value2,
        active: false,
      }
    ]
  }

  setActiveSection = index => event => {
    const { sections } = this.state

    sections.forEach((s, i) => s.active = index === i)

    this.setState(state => ({
      ...state,
      sections
    }))
  }

  getSectionActiveClass = pred =>
    `Post__section${pred ? ' Post__section--active' : ''}`

  render() {
    return (
      <div className="Post__wrapper" >
        {this.state.sections.map((section, index) => (
          <section
            className={this.getSectionActiveClass(section.active)}
            onClick={this.setActiveSection(index)}>
            <Editor {...section} />
          </section>
        ))}
      </div>
    )
  }
}
