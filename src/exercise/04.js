// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function History({history, moveNumber, setBoardToPointInHistory}) {
  return (
    <div>
      {history.map((snapshot, i) => (
        <div key={JSON.stringify(snapshot)}>
          <button
            onClick={() => setBoardToPointInHistory(i)}
            disabled={moveNumber === i}
          >
            Go to {i === 0 ? 'game start' : `move #${i}`}
            {moveNumber === i ? ' (current)' : ''}
          </button>
        </div>
      ))}
    </div>
  )
}

function Board() {
  const [history, setHistory] = useLocalStorageState('history', [
    Array(9).fill(null),
  ])
  const [turnNumber, setTurnNumber] = useLocalStorageState('turnNumber', 0)
  const squares = history[turnNumber]
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)
  const moveNumber = squares.filter(Boolean).length
  function selectSquare(square) {
    if (squares[square] !== null || winner) {
      return
    }
    let squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setTurnNumber(turnNumber => turnNumber + 1)
    setHistory([...history.slice(0, turnNumber + 1), squaresCopy])
  }

  function restart() {
    const emptyBoard = Array(9).fill(null)
    setTurnNumber(0)
    setHistory([emptyBoard])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function setBoardToPointInHistory(moveNumber) {
    setTurnNumber(moveNumber)
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <History
        history={history}
        moveNumber={moveNumber}
        setBoardToPointInHistory={setBoardToPointInHistory}
      />
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
