import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleDone, onTodoChange }) {
  const elems = todos.map((todo) => {
    const { id } = todo

    return <Task key={id} todo={todo} onDeleted={onDeleted} onToggleDone={onToggleDone} onTodoChange={onTodoChange} />
  })

  return <ul className="todo-list">{elems}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onTodoChange: () => {},
}

TaskList.protoTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onTodoChange: PropTypes.func,
}

export default TaskList
