import { apiClient } from './api-client'
import { ClipboardItem, CreateClipboardPayload, UpdateClipboardPayload } from '../model/clipboard.types'
import mockClipboardData from '@/mock/clipboard.json'

// Session-level in-memory storage for mock fallback to allow fully functional CRUD
let mockDatabase: ClipboardItem[] = [...mockClipboardData]

export const clipboardService = {
  async getAll(): Promise<ClipboardItem[]> {
    try {
      const response = await apiClient.get<ClipboardItem[]>('/clipboard')
      return response.data ?? []
    } catch (error) {
      console.warn('API fetch failed, falling back to local mock data:', error)
      return mockDatabase
    }
  },

  async getById(id: string): Promise<ClipboardItem> {
    try {
      const response = await apiClient.get<ClipboardItem>(`/clipboard/${id}`)
      if (!response.data) throw new Error('Not found')
      return response.data
    } catch (error) {
      console.warn(`API fetch for ID ${id} failed, falling back to local mock:`, error)
      const found = mockDatabase.find((item) => item.id === id)
      if (!found) throw new Error(`Clipboard item with ID ${id} not found in mock data`)
      return found
    }
  },

  async create(payload: CreateClipboardPayload): Promise<ClipboardItem> {
    try {
      const response = await apiClient.post<ClipboardItem>('/clipboard', payload)
      return response.data!
    } catch (error) {
      console.warn('API create failed, falling back to local mock logic:', error)
      const newItem: ClipboardItem = {
        id: Math.random().toString(36).substring(2, 9),
        title: payload.title,
        content: payload.content,
        createdAt: new Date().toISOString().split('T')[0],
      }
      mockDatabase.push(newItem)
      return newItem
    }
  },

  async update(payload: UpdateClipboardPayload): Promise<ClipboardItem> {
    try {
      const response = await apiClient.put<ClipboardItem>(`/clipboard/${payload.id}`, payload)
      return response.data!
    } catch (error) {
      console.warn(`API update failed for ID ${payload.id}, falling back to local mock logic:`, error)
      const index = mockDatabase.findIndex((item) => item.id === payload.id)
      if (index === -1) throw new Error('Item not found in mock database')
      
      const updatedItem: ClipboardItem = {
        ...mockDatabase[index],
        title: payload.title,
        content: payload.content,
      }
      mockDatabase[index] = updatedItem
      return updatedItem
    }
  },

  async delete(id: string): Promise<{ id: string }> {
    try {
      await apiClient.delete<{ id: string }>(`/clipboard/${id}`)
      return { id }
    } catch (error) {
      console.warn(`API delete failed for ID ${id}, falling back to local mock logic:`, error)
      mockDatabase = mockDatabase.filter((item) => item.id !== id)
      return { id }
    }
  },
}
