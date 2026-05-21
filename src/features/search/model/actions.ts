import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type SearchRow = Record<string, unknown>





export const fetchSearchThunk = createAsyncThunk<
  SearchRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('search/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<SearchRow[]>>('/search', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch search')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch search')
  }
})

export const createSearchThunk = createAsyncThunk<
  SearchRow,
  Record<string, unknown>,
  { rejectValue: string }
>('search/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<SearchRow>>('/search', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create search')
    }

    return (response.data.data ?? {}) as SearchRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create search')
  }
})

export const patchSearchThunk = createAsyncThunk<
  SearchRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('search/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<SearchRow>>('/search?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update search')
    }

    return (response.data.data ?? {}) as SearchRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update search')
  }
})

export const deleteSearchThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('search/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/search?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete search')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete search')
  }
})
