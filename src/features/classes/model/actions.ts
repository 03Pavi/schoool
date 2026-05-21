import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type ClassesRow = Record<string, unknown>
export const fetchClassesThunk = createAsyncThunk<
  ClassesRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('classes/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<ClassesRow[]>>('/classes', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch classes')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch classes')
  }
})

export const createClassesThunk = createAsyncThunk<
  ClassesRow,
  Record<string, unknown>,
  { rejectValue: string }
>('classes/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<ClassesRow>>('/classes', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create classes')
    }

    return (response.data.data ?? {}) as ClassesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create classes')
  }
})

export const patchClassesThunk = createAsyncThunk<
  ClassesRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('classes/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<ClassesRow>>('/classes?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update classes')
    }

    return (response.data.data ?? {}) as ClassesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update classes')
  }
})

export const deleteClassesThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('classes/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/classes?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete classes')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete classes')
  }
})
