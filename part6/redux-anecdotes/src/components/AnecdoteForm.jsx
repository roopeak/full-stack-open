import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

const NewAnecdote = () => {
	const dispatch = useDispatch()
  
	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

    dispatch(setNotification(`You created '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 4000)
    dispatch(createAnecdote(content))
	}
	return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
	)
}
export default NewAnecdote