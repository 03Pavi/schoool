import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type GradesRow = Record<string, unknown>





export const fetchGradesThunk = createAsyncThunk<
  GradesRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('grades/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<GradesRow[]>>('/grades', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch grades')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch grades')
  }
})

export const createGradesThunk = createAsyncThunk<
  GradesRow,
  Record<string, unknown>,
  { rejectValue: string }
>('grades/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<GradesRow>>('/grades', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create grades')
    }

    return (response.data.data ?? {}) as GradesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create grades')
  }
})

export const patchGradesThunk = createAsyncThunk<
  GradesRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('grades/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<GradesRow>>('/grades?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update grades')
    }

    return (response.data.data ?? {}) as GradesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update grades')
  }
})

export const deleteGradesThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('grades/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/grades?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete grades')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete grades')
  }
})
