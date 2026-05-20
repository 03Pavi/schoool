import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type StudentsRow = Record<string, unknown>

export const fetchStudentsSucceeded = createAction<StudentsRow[]>('students/fetchSucceeded')
export const fetchStudentsFailed = createAction<string>('students/fetchFailed')

export const createStudentsSucceeded = createAction<StudentsRow>('students/createSucceeded')
export const createStudentsFailed = createAction<string>('students/createFailed')

export const patchStudentsSucceeded = createAction<StudentsRow>('students/patchSucceeded')
export const patchStudentsFailed = createAction<string>('students/patchFailed')

export const deleteStudentsSucceeded = createAction<{ id: string }>('students/deleteSucceeded')
export const deleteStudentsFailed = createAction<string>('students/deleteFailed')

export const fetchStudentsThunk = createAsyncThunk<
  StudentsRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('students/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<StudentsRow[]>>('/students', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch students')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch students')
  }
})

export const createStudentsThunk = createAsyncThunk<
  StudentsRow,
  Record<string, unknown>,
  { rejectValue: string }
>('students/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<StudentsRow>>('/students', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create students')
    }

    return (response.data.data ?? {}) as StudentsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create students')
  }
})

export const patchStudentsThunk = createAsyncThunk<
  StudentsRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('students/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<StudentsRow>>('/students?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update students')
    }

    return (response.data.data ?? {}) as StudentsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update students')
  }
})

export const deleteStudentsThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('students/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/students?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete students')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete students')
  }
})
