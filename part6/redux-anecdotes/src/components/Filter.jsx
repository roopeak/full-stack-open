import { setFilter } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const handleChange = (event) => {
    const newFilter = event.target.value
    dispatch(setFilter(newFilter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter 
      <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter