import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StudentState {
  selectedStudentId: string | null
}

const initialState: StudentState = {
  selectedStudentId: null,
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    selectStudent: (state, action: PayloadAction<string | null>) => {
      state.selectedStudentId = action.payload
    },
  },
})

export const { selectStudent } = studentSlice.actions
export default studentSlice.reducer
