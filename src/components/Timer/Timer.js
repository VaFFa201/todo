import React from 'react'

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

export default Timer
