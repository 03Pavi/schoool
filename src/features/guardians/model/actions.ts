import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type GuardiansRow = Record<string, unknown>





export const fetchGuardiansThunk = createAsyncThunk<
  GuardiansRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('guardians/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<GuardiansRow[]>>('/guardians', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch guardians')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch guardians')
  }
})

export const createGuardiansThunk = createAsyncThunk<
  GuardiansRow,
  Record<string, unknown>,
  { rejectValue: string }
>('guardians/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<GuardiansRow>>('/guardians', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create guardians')
    }

    return (response.data.data ?? {}) as GuardiansRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create guardians')
  }
})

export const patchGuardiansThunk = createAsyncThunk<
  GuardiansRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('guardians/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<GuardiansRow>>('/guardians?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update guardians')
    }

    return (response.data.data ?? {}) as GuardiansRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update guardians')
  }
})

export const deleteGuardiansThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('guardians/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/guardians?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete guardians')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete guardians')
  }
})
