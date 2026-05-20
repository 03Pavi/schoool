import axios from 'axios'
import { applyApiInterceptors } from './interceptors'
import { ApiMode } from './types'

export const API_MODE: ApiMode = (process.env.NEXT_PUBLIC_API_MODE as ApiMode) || 'mock'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

applyApiInterceptors(apiClient)
