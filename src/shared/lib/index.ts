import axios from 'axios'

// Standard Axios instance configured for API requests
export const apiInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
