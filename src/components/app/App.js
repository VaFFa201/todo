/* eslint-disable no-useless-return */
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
      todos: [],
      timers: [],
      curFilter: 'all',
    }
  }

  deleteItem = (id) => {
    this.setState(({ todos, timers }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const idTimer = timers.findIndex((el) => el.todoId === id)
      const timer = timers[idTimer]

      timer.timerId = clearInterval(timer.timerId)

      return {
        todos: [...todos.slice(0, idx), ...todos.slice(idx + 1)],
        timers: [...timers.slice(0, idTimer), ...timers.slice(idTimer + 1)],
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

  addItem = (label, minutes, seconds) => {
    const newItem = this.createItem(label)

    const newItemTimer = this.createTimer(newItem.id, minutes, seconds)

    this.setState(({ todos, timers }) => {
      return {
        todos: [newItem, ...todos],
        timers: [newItemTimer, ...timers],
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todos, timers }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const idTimer = timers.findIndex((el) => el.todoId === id)
      const timer = timers[idTimer]

      timer.timerId = clearInterval(timer.timerId)

      const oldItem = todos[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
        timers: [...timers.slice(0, idTimer), timer, ...timers.slice(idTimer + 1)],
      }
    })
  }

  onTodoChange = (id, newLabel, minutesS = 0, secondsS = 0) => {
    this.setState(({ todos, timers }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const idTimer = timers.findIndex((el) => el.todoId === id)

      const oldItem = todos[idx]
      const oldTimer = timers[idTimer]

      const newItem = { ...oldItem, label: newLabel }
      const newTimer = { ...oldTimer, minutes: minutesS, seconds: secondsS }

      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
        timers: [...timers.slice(0, idTimer), newTimer, ...timers.slice(idTimer + 1)],
      }
    })
  }

  onFilterChange = (curFilter) => {
    this.setState({ curFilter })
  }

  startCountdown = (todoId, componentTimerId) => {
    if (componentTimerId) {
      return
    }
    const newTimerId = setInterval(() => {
      this.setState(({ timers }) => {
        const idTimer = timers.findIndex((el) => el.todoId === todoId)
        const timer = timers[idTimer]

        const { timerId, minutes, seconds } = timer

        if (minutes === 0 && seconds === 0) {
          clearInterval(timerId)
          return { timers }
        }

        if (minutes > 0 && seconds === 0) {
          return {
            timers: [
              ...timers.slice(0, idTimer),
              { ...timer, timerId: newTimerId, minutes: minutes - 1, seconds: 59 },
              ...timers.slice(idTimer + 1),
            ],
          }
        }

        return {
          timers: [
            ...timers.slice(0, idTimer),
            { ...timer, timerId: newTimerId, seconds: seconds - 1 },
            ...timers.slice(idTimer + 1),
          ],
        }
      })
    }, 1000)
  }

  stopCountdown = (todoId) => {
    this.setState(({ timers }) => {
      const idTimer = timers.findIndex((el) => el.todoId === todoId)
      const timer = timers[idTimer]

      const { timerId } = timer

      return {
        timers: [
          ...timers.slice(0, idTimer),
          { ...timer, timerId: clearInterval(timerId) },
          ...timers.slice(idTimer + 1),
        ],
      }
    })
  }

  createItem(label) {
    const newItem = {
      id: this.maxId++,
      label,
      done: false,
      createTime: new Date(),
    }

    return newItem
  }

  createTimer(itemId, minutes, seconds) {
    const newItemTimer = {
      timerId: null,
      todoId: itemId,
      minutes,
      seconds,
    }

    return newItemTimer
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
    const { todos, timers, curFilter } = this.state
    const itemsLeft = todos.filter((el) => el.done === false).length
    const curretnItems = this.filterItems(todos, curFilter)

    return (
      <div className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={curretnItems}
            timers={timers}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onTodoChange={this.onTodoChange}
            startCountdown={this.startCountdown}
            stopCountdown={this.stopCountdown}
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
