import { formatDistanceToNow } from 'date-fns'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)

    const { todo } = this.props
    const { label } = todo

    this.state = {
      isEditing: false,
      inputValue: label,
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

  onSubmit = (e) => {
    const { todo, onTodoChange } = this.props
    const { inputValue } = this.state
    const { id } = todo

    e.preventDefault()
    onTodoChange(id, inputValue)
    this.toggleEditState()
  }

  render() {
    const { toggleEditState, onLabelChange, onSubmit } = this
    const { todo, onToggleDone, onDeleted } = this.props
    const { isEditing, inputValue } = this.state
    const { id, label, done, createTime } = todo

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
            <span className="description">{label}</span>
            <span className="created">created {formatDistanceToNow(createTime)} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={toggleEditState}>
            <span className="hidden">Edit</span>
          </button>
          <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)}>
            <span className="hidden">Delete</span>
          </button>
        </div>
        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input type="text" className="edit" value={inputValue} onChange={onLabelChange} />
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
