import React, { Component } from 'react'

import './App.css'
import Footer from '../Footer'
import TaskList from '../TaskList'
import Header from '../Header'

export default class App extends Component {
  maxId = 0

  constructor() {
    super()
    this.state = {
      todos: [this.createItem('Completed task'), this.createItem('Editing task'), this.createItem('Active task')],
      curFilter: 'all',
    }
  }

  deleteItem = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      return {
        todos: [...todos.slice(0, idx), ...todos.slice(idx + 1)],
      }
    })
  }

  deleteCompleteItems = () => {
    this.setState(({ todos }) => {
      const newArr = todos.filter((todo) => todo.done === false)
      return {
        todos: [...newArr],
      }
    })
  }

  addItem = (label) => {
    const newItem = this.createItem(label)

    this.setState(({ todos }) => {
      return {
        todos: [newItem, ...todos],
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)

      const oldItem = todos[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
      }
    })
  }

  onTodoChange = (id, newLabel) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)

      const oldItem = todos[idx]
      const newItem = { ...oldItem, label: newLabel }

      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
      }
    })
  }

  onFilterChange = (curFilter) => {
    this.setState({ curFilter })
  }

  createItem(label) {
    return {
      id: this.maxId++,
      label,
      done: false,
      createTime: new Date(),
    }
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items
    }
    if (filter === 'active') {
      return items.filter((item) => !item.done)
    }
    if (filter === 'completed') {
      return items.filter((item) => item.done)
    }
  }

  render() {
    const { todos, curFilter } = this.state
    const itemsLeft = todos.filter((el) => el.done === false).length
    const curretnItems = this.filterItems(todos, curFilter)

    return (
      <div className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={curretnItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onTodoChange={this.onTodoChange}
          />
          <Footer
            itemsLeft={itemsLeft}
            onFilterChange={this.onFilterChange}
            filter={curFilter}
            deleteCompleteItems={this.deleteCompleteItems}
          />
        </section>
      </div>
    )
  }
}
