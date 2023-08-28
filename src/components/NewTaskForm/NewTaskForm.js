import React, { Component } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      minutes: '',
      seconds: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { addItem } = this.props
    const { inputValue, minutes, seconds } = this.state

    e.preventDefault()
    if (!inputValue.trim().length) {
      return
    }
    addItem(inputValue.trim(), Number(minutes), Number(seconds))
    this.setState({ inputValue: '', minutes: '', seconds: '' })
  }

  render() {
    const { onLabelChange, onMinutesChange, onSecondsChange, onSubmit } = this
    const { inputValue, minutes, seconds } = this.state

    return (
      <form className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={inputValue} />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          onChange={onMinutesChange}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={onSecondsChange}
          value={seconds}
        />
        <button type="submit" onClick={onSubmit}>
          <span className="hidden">Submit</span>
        </button>
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
