/* eslint-disable no-useless-return */
import React, { useState } from 'react'

import './App.css'
import Footer from '../Footer'
import TaskList from '../TaskList'
import Header from '../Header'

function App() {
  const [todos, setTodos] = useState([])
  const [timers, setTimers] = useState([])
  const [curFilter, setCurFilter] = useState('all')
  const [maxId, setMaxId] = useState(0)

  const createItem = (label) => {
    const newItem = {
      id: maxId,
      label,
      done: false,
      createTime: new Date(),
    }

    setMaxId((id) => id + 1)
    return newItem
  }

  const createTimer = (itemId, minutes, seconds) => {
    const newItemTimer = {
      timerId: null,
      todoId: itemId,
      minutes,
      seconds,
    }

    return newItemTimer
  }

  const deleteItem = (id) => {
    const idx = todos.findIndex((el) => el.id === id)
    const idTimer = timers.findIndex((el) => el.todoId === id)
    const timer = timers[idTimer]

    timer.timerId = clearInterval(timer.timerId)

    setTodos([...todos.slice(0, idx), ...todos.slice(idx + 1)])
    setTimers([...timers.slice(0, idTimer), ...timers.slice(idTimer + 1)])
  }

  const deleteCompleteItems = () => {
    const newArr = todos.filter((todo) => todo.done === false)
    setTodos([...newArr])
  }

  const addItem = (label, minutes, seconds) => {
    const newItem = createItem(label)
    const newItemTimer = createTimer(newItem.id, minutes, seconds)

    setTodos([newItem, ...todos])
    setTimers([newItemTimer, ...timers])
  }

  const onToggleDone = (id) => {
    const idx = todos.findIndex((el) => el.id === id)
    const idTimer = timers.findIndex((el) => el.todoId === id)
    const timer = timers[idTimer]

    timer.timerId = clearInterval(timer.timerId)

    const oldItem = todos[idx]
    const newItem = { ...oldItem, done: !oldItem.done }

    setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)])
    setTimers([...timers.slice(0, idTimer), timer, ...timers.slice(idTimer + 1)])
  }

  const onTodoChange = (id, newLabel, minutesS = 0, secondsS = 0) => {
    const idx = todos.findIndex((el) => el.id === id)
    const idTimer = timers.findIndex((el) => el.todoId === id)

    const oldItem = todos[idx]
    const oldTimer = timers[idTimer]

    const newItem = { ...oldItem, label: newLabel }
    const newTimer = { ...oldTimer, minutes: minutesS, seconds: secondsS }

    setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)])
    setTimers([...timers.slice(0, idTimer), newTimer, ...timers.slice(idTimer + 1)])
  }

  const onFilterChange = (curentFilter) => {
    setCurFilter(curentFilter)
  }

  const startCountdown = (todoId, componentTimerId) => {
    if (componentTimerId) {
      return
    }
    const idTimer = timers.findIndex((el) => el.todoId === todoId)

    const newTimerId = setInterval(() => {
      setTimers((timersList) => {
        const newTimersList = [...timersList]
        newTimersList[idTimer].seconds -= 1
        console.log(newTimersList[idTimer].seconds)
        return newTimersList
      })
    }, 1000)

    setTimers((timersList) => {
      const newTimersList = [...timersList]
      newTimersList[idTimer].timerId = newTimerId
      return newTimersList
    })
  }

  const stopCountdown = (todoId) => {
    const idTimer = timers.findIndex((el) => el.todoId === todoId)
    const timer = timers[idTimer]

    const { timerId } = timer

    setTimers([
      ...timers.slice(0, idTimer),
      { ...timer, timerId: clearInterval(timerId) },
      ...timers.slice(idTimer + 1),
    ])
  }

  const filterItems = (items, filter) => {
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

  const itemsLeft = todos.filter((el) => el.done === false).length
  const curretnItems = filterItems(todos, curFilter)

  return (
    <div className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TaskList
          todos={curretnItems}
          timers={timers}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onTodoChange={onTodoChange}
          startCountdown={startCountdown}
          stopCountdown={stopCountdown}
        />
        <Footer
          itemsLeft={itemsLeft}
          onFilterChange={onFilterChange}
          filter={curFilter}
          deleteCompleteItems={deleteCompleteItems}
        />
      </section>
    </div>
  )
}

export default App

// [
//   ...timers.slice(0, idTimer),
//   { ...timer, timerId: newTimerId, minutes: minutes - 1, seconds: 59 },
//   ...timers.slice(idTimer + 1),
// ]

// [
//   ...newTimersList.slice(0, idTimer),
//   { ...timer, timerId: newTimerId, seconds: seconds - 1 },
//   ...newTimersList.slice(idTimer + 1),
// ]

// остатки таймера
// const timer = timers[idTimer]

// const { timerId, minutes, seconds } = timer

// if (minutes === 0 && seconds === 0) {
//   clearInterval(timerId)
//   return
// }
// if (minutes > 0 && seconds === 0) {
//   setTimers((timersList) => {
//     const newTimersList = [...timersList]
//     newTimersList[idTimer].minutes -= 1
//     newTimersList[idTimer].seconds = 59
//     return newTimersList
//   })
// }
