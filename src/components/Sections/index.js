import React, { Component } from 'react'
import * as R from 'ramda'
import Editor from '../Editor'
import './styles.css'

const pickValues = R.map(R.prop('value'))


export default class Sections extends Component {
  constructor(props) {
    super(props)
    const sections = props.sections.map(section => ({
      value: section,
      active: false
    }))
    this.state = { sections }
  }

  setActiveSection = index => event => {
    const { sections } = this.state

    sections.forEach((s, i) => s.active = index === i)

    this.setState(state => ({
      ...state,
      sections
    }))
  }

  setAllSectionsInactive = event => {
    const { sections } = this.state
    sections.forEach(s => s.active = false)
    this.setState({ sections })
  }

  handleDoneClicked = index => json => {
    this.setAllSectionsInactive()
    const resultSections = pickValues(this.state.sections)
    resultSections[index] = json
    this.props.onSave(resultSections)
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
              index={index}
              onDone={this.handleDoneClicked(index)} />
          </section>
        ))}
      </div>
    )
  }
}
