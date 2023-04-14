import axios from './axios'

export default axios({
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
