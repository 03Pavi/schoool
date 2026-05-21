import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type UploadRow = Record<string, unknown>





export const fetchUploadThunk = createAsyncThunk<
  UploadRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('upload/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<UploadRow[]>>('/upload', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch upload')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch upload')
  }
})

export const createUploadThunk = createAsyncThunk<
  UploadRow,
  Record<string, unknown>,
  { rejectValue: string }
>('upload/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<UploadRow>>('/upload', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create upload')
    }

    return (response.data.data ?? {}) as UploadRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create upload')
  }
})

export const patchUploadThunk = createAsyncThunk<
  UploadRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('upload/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<UploadRow>>('/upload?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update upload')
    }

    return (response.data.data ?? {}) as UploadRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update upload')
  }
})

export const deleteUploadThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('upload/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/upload?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete upload')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete upload')
  }
})
