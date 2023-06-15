import React, { Component } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { addItem } = this.props
    const { inputValue } = this.state

    e.preventDefault()
    if (!inputValue.trim().length) {
      return
    }
    addItem(inputValue.trim())
    this.setState({ inputValue: '' })
  }

  render() {
    const { onLabelChange, onSubmit } = this
    const { inputValue } = this.state

    return (
      <form onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={inputValue} />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
