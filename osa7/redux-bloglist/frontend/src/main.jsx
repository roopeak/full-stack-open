import React from 'react'
import ReactDOM from 'react-dom/client'

<<<<<<< HEAD
import { Provider } from 'react-redux'
import store from "./store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>  
)
=======
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import bloglistReducer from './reducers/bloglistReducer'

const store = createStore(bloglistReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
>>>>>>> 757cae677b6d1b15768056565f7076ff0a123ff2
