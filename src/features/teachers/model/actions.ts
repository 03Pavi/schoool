import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type TeachersRow = Record<string, unknown>

export const fetchTeachersSucceeded = createAction<TeachersRow[]>('teachers/fetchSucceeded')
export const fetchTeachersFailed = createAction<string>('teachers/fetchFailed')

export const createTeachersSucceeded = createAction<TeachersRow>('teachers/createSucceeded')
export const createTeachersFailed = createAction<string>('teachers/createFailed')

export const patchTeachersSucceeded = createAction<TeachersRow>('teachers/patchSucceeded')
export const patchTeachersFailed = createAction<string>('teachers/patchFailed')

export const deleteTeachersSucceeded = createAction<{ id: string }>('teachers/deleteSucceeded')
export const deleteTeachersFailed = createAction<string>('teachers/deleteFailed')

export const fetchTeachersThunk = createAsyncThunk<
  TeachersRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('teachers/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<TeachersRow[]>>('/teachers', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch teachers')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch teachers')
  }
})

export const createTeachersThunk = createAsyncThunk<
  TeachersRow,
  Record<string, unknown>,
  { rejectValue: string }
>('teachers/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<TeachersRow>>('/teachers', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create teachers')
    }

    return (response.data.data ?? {}) as TeachersRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create teachers')
  }
})

export const patchTeachersThunk = createAsyncThunk<
  TeachersRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('teachers/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<TeachersRow>>('/teachers?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update teachers')
    }

    return (response.data.data ?? {}) as TeachersRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update teachers')
  }
})

export const deleteTeachersThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('teachers/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/teachers?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete teachers')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete teachers')
  }
})
