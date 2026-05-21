import { ApiResponse } from '@/shared/api/contracts'

export class ApiError extends Error {
  constructor(public message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiClient = {
  async request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = path.startsWith('http') ? path : `/api${path}`
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, { ...options, headers })
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errData = await response.json()
          errorMessage = errData.message || errorMessage
        } catch {
          // ignore parsing error
        }
        throw new ApiError(errorMessage, response.status)
      }

      const data: ApiResponse<T> = await response.json()
      return data
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(error?.message || 'Network request failed')
    }
  },

  async get<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'GET' })
  },

  async post<T>(path: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  async put<T>(path: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  },

  async delete<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'DELETE' })
  },
}
