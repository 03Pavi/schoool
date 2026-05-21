import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type SubjectsRow = Record<string, unknown>





export const fetchSubjectsThunk = createAsyncThunk<
  SubjectsRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('subjects/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<SubjectsRow[]>>('/subjects', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch subjects')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch subjects')
  }
})

export const createSubjectsThunk = createAsyncThunk<
  SubjectsRow,
  Record<string, unknown>,
  { rejectValue: string }
>('subjects/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<SubjectsRow>>('/subjects', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create subjects')
    }

    return (response.data.data ?? {}) as SubjectsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create subjects')
  }
})

export const patchSubjectsThunk = createAsyncThunk<
  SubjectsRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('subjects/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<SubjectsRow>>('/subjects?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update subjects')
    }

    return (response.data.data ?? {}) as SubjectsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update subjects')
  }
})

export const deleteSubjectsThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('subjects/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/subjects?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete subjects')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete subjects')
  }
})
