import { formatDistanceToNow } from 'date-fns'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'

function Task({ todo, timer, onToggleDone, onTodoChange, onDeleted, startCountdown, stopCountdown }) {
  const { minutes, seconds, timerId } = timer
  const { id, label, done, createTime } = todo

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(label)
  const [minutesS, setMinutesS] = useState(minutes)
  const [secondsS, setSecondsS] = useState(seconds)

  const toggleEditState = () => {
    setIsEditing(!isEditing)
  }

  const onLabelChange = (e) => {
    setInputValue(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutesS(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSecondsS(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (Number(minutesS) >= 60 || Number(secondsS) >= 60) {
      alert('Неверные значения минут или секунд')
      return
    }

    onTodoChange(id, inputValue, minutesS, secondsS)
    toggleEditState()
  }

  let classNames

  if (done) {
    classNames = 'completed'
  }

  if (isEditing) {
    classNames = 'editing'
  }

  const inputId = `check${id}`

  return (
    <li className={classNames}>
      <div className="view">
        <input id={inputId} className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
        <label htmlFor={inputId}>
          <span className="title">{label}</span>
          <Timer
            minutes={minutes}
            seconds={seconds}
            timerId={timerId}
            todoId={id}
            startCountdown={startCountdown}
            stopCountdown={stopCountdown}
          />
          <span className="description">created {formatDistanceToNow(createTime)} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={toggleEditState}>
          <span className="hidden">Edit</span>
        </button>
        <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)}>
          <span className="hidden">Delete</span>
        </button>
      </div>
      {isEditing ? (
        <form className="new-todo-form" onSubmit={onSubmit}>
          <input type="text" className="edit" value={inputValue} onChange={onLabelChange} />
          <input className="new-todo-form__timer" placeholder="Min" onChange={onMinutesChange} value={minutesS} />
          <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecondsChange} value={secondsS} />
          <button type="submit" onClick={onSubmit}>
            <span className="hidden">Submit</span>
          </button>
        </form>
      ) : (
        <span />
      )}
    </li>
  )
}

Task.defaultProps = {
  onTodoChange: () => {},
  onToggleDone: () => {},
  onDeleted: () => {},
  startCountdown: () => {},
  stopCountdown: () => {},
}

Task.propTypes = {
  onTodoChange: PropTypes.func,
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  startCountdown: PropTypes.func,
  stopCountdown: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    done: PropTypes.bool,
    createTime: PropTypes.object,
  }).isRequired,
}

export default Task
