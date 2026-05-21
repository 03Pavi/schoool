import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '@/shared/lib'
import { ApiResponse } from '@/shared/api/contracts'

export type DashboardRow = Record<string, unknown>





export const fetchDashboardThunk = createAsyncThunk<
  DashboardRow[],
  { page?: number; limit?: number; search?: string; sort?: string; order?: 'asc' | 'desc' } | undefined,
  { rejectValue: string }
>('dashboard/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get<ApiResponse<DashboardRow[]>>('/dashboard', {
      params: params ?? {},
    })

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to fetch dashboard')
    }

    return response.data.data ?? []
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch dashboard')
  }
})

export const createDashboardThunk = createAsyncThunk<
  DashboardRow,
  Record<string, unknown>,
  { rejectValue: string }
>('dashboard/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post<ApiResponse<DashboardRow>>('/dashboard', payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to create dashboard')
    }

    return (response.data.data ?? {}) as DashboardRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to create dashboard')
  }
})

export const patchDashboardThunk = createAsyncThunk<
  DashboardRow,
  { id: string; payload: Record<string, unknown> },
  { rejectValue: string }
>('dashboard/patch', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.patch<ApiResponse<DashboardRow>>('/dashboard?id=' + id, payload)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to update dashboard')
    }

    return (response.data.data ?? {}) as DashboardRow
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to update dashboard')
  }
})

export const deleteDashboardThunk = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('dashboard/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiInstance.delete<ApiResponse<{ id?: string }>>('/dashboard?id=' + id)

    if (!response.data.success) {
      return rejectWithValue(response.data.message || 'Failed to delete dashboard')
    }

    return { id: response.data.data?.id || id }
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete dashboard')
  }
})
