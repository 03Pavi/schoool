import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type AssignmentRow = {
  id: string
  hwCode: string
  title: string
  class: string
  dueDate: string
  status: string
}

export const fetchAssignmentsSucceeded = createAction<AssignmentRow[]>('assignments/fetchSucceeded')
export const fetchAssignmentsFailed = createAction<string>('assignments/fetchFailed')

export const createAssignmentsSucceeded = createAction<AssignmentRow>('assignments/createSucceeded')
export const createAssignmentsFailed = createAction<string>('assignments/createFailed')

export const patchAssignmentsSucceeded = createAction<AssignmentRow>('assignments/patchSucceeded')
export const patchAssignmentsFailed = createAction<string>('assignments/patchFailed')

export const deleteAssignmentsSucceeded = createAction<{ id: string }>('assignments/deleteSucceeded')
export const deleteAssignmentsFailed = createAction<string>('assignments/deleteFailed')

export const fetchAssignmentsThunk = createAsyncThunk<
  AssignmentRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('assignments/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<AssignmentRow[]>>('/assignments', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch assignments')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch assignments')
  }
})

export const createAssignmentThunk = createAsyncThunk<
  AssignmentRow,
  Record<string, unknown>,
  { rejectValue: string }
>('assignments/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<AssignmentRow>>('/assignments', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create assignment')
    }

    return response.data.data as AssignmentRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create assignment')
  }
})

export const patchAssignmentThunk = createAsyncThunk<
  AssignmentRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('assignments/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<AssignmentRow>>(`/assignments?id=${id}`, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update assignment')
    }

    return response.data.data as AssignmentRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update assignment')
  }
})

export const deleteAssignmentThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('assignments/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>(`/assignments?id=${id}`)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete assignment')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete assignment')
  }
})
