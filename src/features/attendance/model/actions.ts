import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type AttendanceRow = Record<string, unknown>

export const fetchAttendanceSucceeded = createAction<AttendanceRow[]>('attendance/fetchSucceeded')
export const fetchAttendanceFailed = createAction<string>('attendance/fetchFailed')

export const createAttendanceSucceeded = createAction<AttendanceRow>('attendance/createSucceeded')
export const createAttendanceFailed = createAction<string>('attendance/createFailed')

export const patchAttendanceSucceeded = createAction<AttendanceRow>('attendance/patchSucceeded')
export const patchAttendanceFailed = createAction<string>('attendance/patchFailed')

export const deleteAttendanceSucceeded = createAction<{ id: string }>('attendance/deleteSucceeded')
export const deleteAttendanceFailed = createAction<string>('attendance/deleteFailed')

export const fetchAttendanceThunk = createAsyncThunk<
  AttendanceRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('attendance/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<AttendanceRow[]>>('/attendance', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch attendance')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch attendance')
  }
})

export const createAttendanceThunk = createAsyncThunk<
  AttendanceRow,
  Record<string, unknown>,
  { rejectValue: string }
>('attendance/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<AttendanceRow>>('/attendance', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create attendance')
    }

    return (response.data.data ?? {}) as AttendanceRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create attendance')
  }
})

export const patchAttendanceThunk = createAsyncThunk<
  AttendanceRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('attendance/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<AttendanceRow>>('/attendance?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update attendance')
    }

    return (response.data.data ?? {}) as AttendanceRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update attendance')
  }
})

export const deleteAttendanceThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('attendance/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/attendance?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete attendance')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete attendance')
  }
})
