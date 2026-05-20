import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type RolesRow = Record<string, unknown>

export const fetchRolesSucceeded = createAction<RolesRow[]>('roles/fetchSucceeded')
export const fetchRolesFailed = createAction<string>('roles/fetchFailed')

export const createRolesSucceeded = createAction<RolesRow>('roles/createSucceeded')
export const createRolesFailed = createAction<string>('roles/createFailed')

export const patchRolesSucceeded = createAction<RolesRow>('roles/patchSucceeded')
export const patchRolesFailed = createAction<string>('roles/patchFailed')

export const deleteRolesSucceeded = createAction<{ id: string }>('roles/deleteSucceeded')
export const deleteRolesFailed = createAction<string>('roles/deleteFailed')

export const fetchRolesThunk = createAsyncThunk<
  RolesRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('roles/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<RolesRow[]>>('/roles', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch roles')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch roles')
  }
})

export const createRolesThunk = createAsyncThunk<
  RolesRow,
  Record<string, unknown>,
  { rejectValue: string }
>('roles/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<RolesRow>>('/roles', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create roles')
    }

    return (response.data.data ?? {}) as RolesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create roles')
  }
})

export const patchRolesThunk = createAsyncThunk<
  RolesRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('roles/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<RolesRow>>('/roles?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update roles')
    }

    return (response.data.data ?? {}) as RolesRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update roles')
  }
})

export const deleteRolesThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('roles/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/roles?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete roles')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete roles')
  }
})
