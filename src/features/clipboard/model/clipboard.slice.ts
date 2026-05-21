import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClipboardState, ClipboardItem } from './clipboard.types'
import {
  fetchClipboardItemsThunk,
  fetchClipboardItemByIdThunk,
  createClipboardItemThunk,
  updateClipboardItemThunk,
  deleteClipboardItemThunk,
} from './clipboard.thunk'

const initialState: ClipboardState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
}

// Keep a backup of items for reverting optimistic updates if they fail
let itemsBackup: ClipboardItem[] = []

export const clipboardSlice = createSlice({
  name: 'clipboard',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null
    },
    setCurrentItem: (state, action: PayloadAction<ClipboardItem | null>) => {
      state.currentItem = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch all items
    builder
      .addCase(fetchClipboardItemsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClipboardItemsThunk.fulfilled, (state, action: PayloadAction<ClipboardItem[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchClipboardItemsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch clipboard items'
      })

    // Fetch single item by ID
    builder
      .addCase(fetchClipboardItemByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClipboardItemByIdThunk.fulfilled, (state, action: PayloadAction<ClipboardItem>) => {
        state.loading = false
        state.currentItem = action.payload
      })
      .addCase(fetchClipboardItemByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch clipboard item'
      })

    // Create item
    builder
      .addCase(createClipboardItemThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createClipboardItemThunk.fulfilled, (state, action: PayloadAction<ClipboardItem>) => {
        state.loading = false
        state.items.unshift(action.payload)
      })
      .addCase(createClipboardItemThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create clipboard item'
      })

    // Update item
    builder
      .addCase(updateClipboardItemThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateClipboardItemThunk.fulfilled, (state, action: PayloadAction<ClipboardItem>) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload
        }
      })
      .addCase(updateClipboardItemThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update clipboard item'
      })

    // Delete item (Optimistic UI Update)
    builder
      .addCase(deleteClipboardItemThunk.pending, (state, action) => {
        const deletedId = action.meta.arg
        itemsBackup = [...state.items]
        state.items = state.items.filter((item) => item.id !== deletedId)
        state.error = null
      })
      .addCase(deleteClipboardItemThunk.fulfilled, (state, action) => {
        itemsBackup = []
      })
      .addCase(deleteClipboardItemThunk.rejected, (state, action) => {
        state.items = itemsBackup
        itemsBackup = []
        state.error = action.payload || 'Failed to delete clipboard item'
      })
  },
})

export const { clearCurrentItem, setCurrentItem, clearError } = clipboardSlice.actions
export default clipboardSlice.reducer
