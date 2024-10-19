import { useSelector } from 'react-redux'

const Notification = () => {
  const newNotification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {newNotification}
    </div>
  )
}

export default Notification