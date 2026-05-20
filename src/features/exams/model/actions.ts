import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type ExamsRow = Record<string, unknown>

export const fetchExamsSucceeded = createAction<ExamsRow[]>('exams/fetchSucceeded')
export const fetchExamsFailed = createAction<string>('exams/fetchFailed')

export const createExamsSucceeded = createAction<ExamsRow>('exams/createSucceeded')
export const createExamsFailed = createAction<string>('exams/createFailed')

export const patchExamsSucceeded = createAction<ExamsRow>('exams/patchSucceeded')
export const patchExamsFailed = createAction<string>('exams/patchFailed')

export const deleteExamsSucceeded = createAction<{ id: string }>('exams/deleteSucceeded')
export const deleteExamsFailed = createAction<string>('exams/deleteFailed')

export const fetchExamsThunk = createAsyncThunk<
  ExamsRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('exams/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<ExamsRow[]>>('/exams', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch exams')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch exams')
  }
})

export const createExamsThunk = createAsyncThunk<
  ExamsRow,
  Record<string, unknown>,
  { rejectValue: string }
>('exams/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<ExamsRow>>('/exams', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create exams')
    }

    return (response.data.data ?? {}) as ExamsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create exams')
  }
})

export const patchExamsThunk = createAsyncThunk<
  ExamsRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('exams/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<ExamsRow>>('/exams?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update exams')
    }

    return (response.data.data ?? {}) as ExamsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update exams')
  }
})

export const deleteExamsThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('exams/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/exams?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete exams')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete exams')
  }
})
