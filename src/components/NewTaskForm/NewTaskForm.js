import React, { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

function NewTaskForm({ addItem }) {
  const [inputValue, setInputValue] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setInputValue(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const clearInputs = () => {
    setInputValue('')
    setMinutes('')
    setSeconds('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (Number(minutes) >= 60 || Number(seconds) >= 60) {
      alert('Неверные значения минут или секунд')
      return
    }

    if (!inputValue.trim().length) {
      return
    }
    addItem(inputValue.trim(), Number(minutes), Number(seconds))
    clearInputs()
  }

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

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}

export default NewTaskForm
