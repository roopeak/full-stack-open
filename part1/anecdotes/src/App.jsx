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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const voteAnecdote = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setVotes(copy)
  }

  const Most = () => {
    let max = votes[0]
    let maxIndex = 0
  
    for (let i = 1; i < 8; i++) {
      if (votes[i] > max) {
        maxIndex = i
        max = votes[i]
      }
    }
  
    return (
      <div>
        <div>{anecdotes[maxIndex]}</div>
        <div>has {votes[maxIndex]} votes</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteAnecdote}>
        vote
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>
        next anecdote
      </button>
      <div>
        <h1>Anecdote with most wotes</h1>
        <Most votes={votes} anecdotes={anecdotes} />
      </div>
    </div>
  )
}

export default App