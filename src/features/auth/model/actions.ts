import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type AuthRow = Record<string, unknown>
export const fetchAuthThunk = createAsyncThunk<
  AuthRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('auth/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<AuthRow[]>>('/auth', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch auth')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch auth')
  }
})

export const createAuthThunk = createAsyncThunk<
  AuthRow,
  Record<string, unknown>,
  { rejectValue: string }
>('auth/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<AuthRow>>('/auth', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create auth')
    }

    return (response.data.data ?? {}) as AuthRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create auth')
  }
})

export const patchAuthThunk = createAsyncThunk<
  AuthRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('auth/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<AuthRow>>('/auth?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update auth')
    }

    return (response.data.data ?? {}) as AuthRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update auth')
  }
})

export const deleteAuthThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('auth/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/auth?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete auth')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete auth')
  }
})
