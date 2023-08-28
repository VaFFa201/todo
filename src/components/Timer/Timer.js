import React from 'react'
import PropTypes from 'prop-types'

function Timer({ minutes, seconds, todoId, startCountdown, stopCountdown }) {
  return (
    <span className="description">
      <button
        type="button"
        className="icon icon-play"
        onClick={() => {
          startCountdown(todoId)
        }}
      >
        <span className="hidden">Play</span>
      </button>
      <button
        type="button"
        className="icon icon-pause"
        onClick={() => {
          stopCountdown(todoId)
        }}
      >
        <span className="hidden">Pause</span>
      </button>
      {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  )
}

Timer.defaultProps = {
  startCountdown: () => {},
  stopCountdown: () => {},
  minutes: 0,
  seconds: 0,
}

Timer.propTypes = {
  startCountdown: PropTypes.func,
  stopCountdown: PropTypes.func,
  minutes: PropTypes.number(),
  seconds: PropTypes.number(),
  todoId: PropTypes.number().isRequired,
}

export default Timer
