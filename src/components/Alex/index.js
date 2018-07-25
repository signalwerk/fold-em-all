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

  render() {
    return (
      <Fragment >
        {this.state.sections.map((section, index) => (
          <section onClick={this.setActiveSection(index)}>
            <Editor {...section} />
          </section>
        ))}
      </Fragment >
    )
  }
}
