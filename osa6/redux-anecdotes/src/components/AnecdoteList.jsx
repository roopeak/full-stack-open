import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, } from '../reducers/notificationReducer'
import Filter from './Filter'
import Notification from './Notification'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <div>
      <Notification />
      <Filter />
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Anecdotes
