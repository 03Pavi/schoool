import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type NotificationsRow = Record<string, unknown>
export const fetchNotificationsThunk = createAsyncThunk<
  NotificationsRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('notifications/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<NotificationsRow[]>>('/notifications', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch notifications')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch notifications')
  }
})

export const createNotificationsThunk = createAsyncThunk<
  NotificationsRow,
  Record<string, unknown>,
  { rejectValue: string }
>('notifications/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<NotificationsRow>>('/notifications', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create notifications')
    }

    return (response.data.data ?? {}) as NotificationsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create notifications')
  }
})

export const patchNotificationsThunk = createAsyncThunk<
  NotificationsRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('notifications/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<NotificationsRow>>('/notifications?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update notifications')
    }

    return (response.data.data ?? {}) as NotificationsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update notifications')
  }
})

export const deleteNotificationsThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('notifications/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/notifications?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete notifications')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete notifications')
  }
})
