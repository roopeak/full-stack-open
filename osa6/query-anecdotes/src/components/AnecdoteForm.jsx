import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation
      .mutate({ 
        content, votes: 0 
      },
      {
        onSuccess: () => {
          notificationDispatch({
            type: "SHOW_NOTIFICATION",
            data: `anecdote '${content}' created`
          })
          setTimeout(() => {
            notificationDispatch({ type: "HIDE_NOTIFICATION" })
          }, 5000)
        }
      })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
