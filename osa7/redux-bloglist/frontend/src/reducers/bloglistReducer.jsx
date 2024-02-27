const initialState = {
  user: '',
  blogs: [],
  info: { message: null },
}

const bloglistReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_NOTIFICATION':
        return { ...state, info: { message: action.payload } }
      case 'HIDE_NOTIFICATION':
        return { state, info: { message: null } }
      
      default:
        return state
    }
}

export const setNotification = (message, type = 'info') => ({
  type: 'SET_NOTIFICATION',
  payload: { message, type },
})

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION',
})

export default bloglistReducer