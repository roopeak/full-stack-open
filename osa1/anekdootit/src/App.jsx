import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(new Uint8Array(8))
  const [selected, setSelected] = useState(0)

  const addVote = () => {
    Most()
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const Most = () => {
    let max = points[0]
    let maxIndex = 0

    for (let i = 1; i < 8; i++)
    {
      if (points[i] > max)
      {
        maxIndex = i
        max = points[i]
      }
    }

    return (
      <div>
        <div>{anecdotes[maxIndex]}</div>
        <div>has {points[maxIndex]} votes</div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
      </div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <button onClick={addVote}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Most points={points} anecdotes={anecdotes} />
      </div>
    </div>
  )
}

export default App