import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AssignmentRow,
  fetchAssignmentsThunk,
  createAssignmentThunk,
  patchAssignmentThunk,
  deleteAssignmentThunk,
} from './actions'

interface AssignmentsState {
  items: AssignmentRow[]
  loading: boolean
  error: string | null
}

const initialState: AssignmentsState = {
  items: [],
  loading: false,
  error: null,
}

export const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    // Reducers to support any manual overrides if necessary
    setAssignments: (state, action: PayloadAction<AssignmentRow[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchAssignmentsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAssignmentsThunk.fulfilled, (state, action: PayloadAction<AssignmentRow[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAssignmentsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch assignments'
      })

    // Create
    builder
      .addCase(createAssignmentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createAssignmentThunk.fulfilled, (state, action: PayloadAction<AssignmentRow>) => {
        state.loading = false
        state.items.unshift(action.payload)
      })
      .addCase(createAssignmentThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create assignment'
      })

    // Patch
    builder
      .addCase(patchAssignmentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(patchAssignmentThunk.fulfilled, (state, action: PayloadAction<AssignmentRow>) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(patchAssignmentThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update assignment'
      })

    // Delete
    builder
      .addCase(deleteAssignmentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAssignmentThunk.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false
        state.items = state.items.filter((item) => item.id !== action.payload.id)
      })
      .addCase(deleteAssignmentThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete assignment'
      })
  },
})

export const { setAssignments } = assignmentsSlice.actions
export default assignmentsSlice.reducer
