import { AxiosError, AxiosInstance } from 'axios'

export const applyApiInterceptors = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || error.message || 'API request failed'
      return Promise.reject(new Error(message))
    }
  )
}
