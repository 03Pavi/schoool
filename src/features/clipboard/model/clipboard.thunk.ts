import { createAsyncThunk } from '@reduxjs/toolkit'
import { clipboardService } from '../api/clipboard.service'
import { ClipboardItem, CreateClipboardPayload, UpdateClipboardPayload } from './clipboard.types'

export const fetchClipboardItemsThunk = createAsyncThunk<
  ClipboardItem[],
  void,
  { rejectValue: string }
>('clipboard/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await clipboardService.getAll()
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch clipboard items')
  }
})

export const fetchClipboardItemByIdThunk = createAsyncThunk<
  ClipboardItem,
  string,
  { rejectValue: string }
>('clipboard/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await clipboardService.getById(id)
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch clipboard item')
  }
})

export const createClipboardItemThunk = createAsyncThunk<
  ClipboardItem,
  CreateClipboardPayload,
  { rejectValue: string }
>('clipboard/create', async (payload, { rejectWithValue }) => {
  try {
    return await clipboardService.create(payload)
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create clipboard item')
  }
})

export const updateClipboardItemThunk = createAsyncThunk<
  ClipboardItem,
  UpdateClipboardPayload,
  { rejectValue: string }
>('clipboard/update', async (payload, { rejectWithValue }) => {
  try {
    return await clipboardService.update(payload)
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update clipboard item')
  }
})

export const deleteClipboardItemThunk = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('clipboard/delete', async (id, { rejectWithValue }) => {
  try {
    return await clipboardService.delete(id)
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete clipboard item')
  }
})
