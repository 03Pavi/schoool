import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type PermissionsRow = Record<string, unknown>
export const fetchPermissionsThunk = createAsyncThunk<
  PermissionsRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('permissions/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<PermissionsRow[]>>('/permissions', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch permissions')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch permissions')
  }
})

export const createPermissionsThunk = createAsyncThunk<
  PermissionsRow,
  Record<string, unknown>,
  { rejectValue: string }
>('permissions/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<PermissionsRow>>('/permissions', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create permissions')
    }

    return (response.data.data ?? {}) as PermissionsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create permissions')
  }
})

export const patchPermissionsThunk = createAsyncThunk<
  PermissionsRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('permissions/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<PermissionsRow>>('/permissions?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update permissions')
    }

    return (response.data.data ?? {}) as PermissionsRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update permissions')
  }
})

export const deletePermissionsThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('permissions/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/permissions?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete permissions')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete permissions')
  }
})
