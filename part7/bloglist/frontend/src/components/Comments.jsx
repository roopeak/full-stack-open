import { useDispatch } from 'react-redux'
import { useField } from "../hooks/hooks";
import { createComment } from '../reducers/bloglistReducer';

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text')

  const { id, comments } = blog

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(createComment(id, comment.value.trim()))
    resetComment()
  }

  const commentStyle = {
    padding: 20
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input {...comment}/>
          <button type="submit">add comment</button>
        </div>
      </form>
      <div style={commentStyle}>
        {comments.map((comment, i) =>
          <li key={i}>{comment}</li>
        )}
      </div>
    </div>
  )
}

export default Comments