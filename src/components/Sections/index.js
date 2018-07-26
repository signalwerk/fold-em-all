import React, { Component } from 'react'
import * as R from 'ramda'
import Editor from '../Editor'
import './styles.css'

const pickValues = R.map(R.prop('value'))


export default class Sections extends Component {
  constructor(props) {
    super(props)
    const cells = props.sections.map(section => ({
      value: section,
      active: false
    }))
    this.state = {
      cells,
      sections: [[0], [1, 2], [3, 4, 5, 6], [7]],
      activeSectionIndex: undefined
    }
  }

  setActiveCell = index => event => {
    const cells = this.state.cells.map((cell, i) => ({
      ...cell,
      active: index === i
    }))
    this.setState({ cells })
  }

  setAllCellsInactive = event => {
    const cells = this.state.cells.map(cell => ({
      ...cell,
      active: false
    }))
    this.setState({ cells })
  }

  setActiveSection = activeSectionIndex => event => {
    this.setState({ activeSectionIndex })
  }

  handleDoneClicked = index => json => {
    this.setAllCellsInactive()
    const resultCells = pickValues(this.state.cells)
    resultCells[index] = json
    this.props.onSave(resultCells)
  }

  getSectionActiveClass = sectionActiveIndex => sectionIndex =>
    `Post__section${
      sectionIndex === sectionActiveIndex
        ? ' Post__section--active'
        : ''}`

  getCellActiveClass = pred =>
    `Post__cell${pred ? ' Post__cell--active' : ''}`

  render() {
    const { sections, activeSectionIndex, cells } = this.state
    const getSectionActiveClass = this.getSectionActiveClass(activeSectionIndex)
    return (
      <div className="Post__wrapper" >
        {sections.map((section, sectionIndex) => (
          <section
            className={getSectionActiveClass(sectionIndex)}
            onClick={this.setActiveSection(sectionIndex)}>
            {
              section.map(cellIndex => (
                <div
                  className={this.getCellActiveClass(cells[cellIndex].active)}
                  onClick={this.setActiveCell(cellIndex)}>
                  <Editor
                    {...cells[cellIndex]}
                    index={cellIndex}
                    onDone={this.handleDoneClicked(cellIndex)} />
                </div>
              ))
            }
          </section>
        ))}
      </div>
    )
  }
}
