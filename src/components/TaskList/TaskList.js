import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, timers, onDeleted, onToggleDone, onTodoChange, startCountdown, stopCountdown }) {
  const elems = todos.map((todo) => {
    const { id } = todo
    const timer = timers.find((item) => item.todoId === id)

    return (
      <Task
        key={id}
        todo={todo}
        timer={timer}
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
        onTodoChange={onTodoChange}
        startCountdown={startCountdown}
        stopCountdown={stopCountdown}
      />
    )
  })

  return <ul className="todo-list">{elems}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onTodoChange: () => {},
  startCountdown: () => {},
  stopCountdown: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  timers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onTodoChange: PropTypes.func,
  startCountdown: PropTypes.func,
  stopCountdown: PropTypes.func,
}

export default TaskList
