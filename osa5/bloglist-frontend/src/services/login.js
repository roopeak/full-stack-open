<<<<<<< HEAD
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
=======
import axios from "axios"
const baseUrl = "http://localhost:3003/api/login"

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
}

export default { login }