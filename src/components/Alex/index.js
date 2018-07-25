import React, { Component } from 'react'
import Editor from './components/Editor'
import { value1, valueText, valueImage } from './initialValue'

export default class Alex extends Component {
  state = {
    sections: [
      {
        value: value1,
        active: false,
      },
      {
        value: valueText,
        active: false,
      },
      {
        value: valueImage,
        active: false,
      },
      {
        value: valueText,
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

  setInactive = index => event => {
    const { sections } = this.state
    sections.forEach(s => s.active = false)
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
            <Editor
              {...section}
              onDoneCallback={this.setInactive(index)} />
          </section>
        ))}
      </div>
    )
  }
}
