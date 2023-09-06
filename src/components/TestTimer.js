/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react'

function TestTimer() {
  const [timers, setTimers] = useState([])

  function addTimer() {
    setTimers([...timers, { id: Date.now(), time: 0, intervalRef: null }])
  }

  function removeTimer(id) {
    setTimers(timers.filter((timer) => timer.id !== id))
  }

  function startTimer(id) {
    const index = timers.findIndex((timer) => timer.id === id)
    if (index !== -1) {
      const intervalRef = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = [...prevTimers]
          newTimers[index].time += 1
          return newTimers
        })
      }, 1000)
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers]
        newTimers[index].intervalRef = intervalRef
        return newTimers
      })
    }
  }

  function stopTimer(id) {
    const index = timers.findIndex((timer) => timer.id === id)
    if (index !== -1) {
      clearInterval(timers[index].intervalRef)
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers]
        newTimers[index].intervalRef = null
        return newTimers
      })
    }
  }

  useEffect(() => {
    // cleanup intervalRefs on unmount
    return () => {
      timers.forEach((timer) => {
        if (timer.intervalRef !== null) {
          clearInterval(timer.intervalRef)
        }
      })
    }
  }, [timers])

  return (
    <div>
      <button onClick={addTimer}>Add Timer</button>
      {timers.map((timer) => (
        <div key={timer.id}>
          <div>Time: {timer.time}</div>
          <button onClick={() => startTimer(timer.id)}>Start</button>
          <button onClick={() => stopTimer(timer.id)}>Stop</button>
          <button onClick={() => removeTimer(timer.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default TestTimer
