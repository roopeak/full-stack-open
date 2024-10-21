import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdotes = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
	
  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 4000)
    dispatch(voteAnecdote(anecdote))
  }
	return (
		<div>
      <Filter />
			{anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
			)}
		</div>
	)
}
export default Anecdotes