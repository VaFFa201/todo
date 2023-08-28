import { formatDistanceToNow } from 'date-fns'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'

export default class Task extends Component {
  constructor(props) {
    super(props)

    const { todo, timer } = this.props
    const { minutes, seconds } = timer
    const { label } = todo

    this.state = {
      isEditing: false,
      inputValue: label,
      minutesS: minutes,
      secondsS: seconds,
    }
  }

  toggleEditState = () => {
    this.setState(({ isEditing }) => {
      return {
        isEditing: !isEditing,
      }
    })
  }

  onLabelChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      minutesS: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      secondsS: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { todo, onTodoChange } = this.props
    const { inputValue, minutesS, secondsS } = this.state
    const { id } = todo

    e.preventDefault()
    onTodoChange(id, inputValue, minutesS, secondsS)
    this.toggleEditState()
  }

  render() {
    const { toggleEditState, onLabelChange, onMinutesChange, onSecondsChange, onSubmit } = this
    const { todo, timer, onToggleDone, onDeleted, startCountdown, stopCountdown } = this.props
    const { isEditing, inputValue, minutesS, secondsS } = this.state
    const { id, label, done, createTime } = todo
    const { minutes, seconds } = timer

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
}

Task.defaultProps = {
  onTodoChange: () => {},
  onToggleDone: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  onTodoChange: PropTypes.func,
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    done: PropTypes.bool,
    createTime: PropTypes.object,
  }).isRequired,
}
