import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AcademicMetadata, GradeRow, SubjectRow } from '@/features/manage-academics/api/academic-api'

type AcademicState = {
  grades: GradeRow[]
  subjects: SubjectRow[]
  metadata: AcademicMetadata
}

const initialState: AcademicState = {
  grades: [],
  subjects: [],
  metadata: {
    grades: [],
    classes: [],
    sections: [],
    subjects: [],
    teachers: [],
  },
}

export const academicSlice = createSlice({
  name: 'academic',
  initialState,
  reducers: {
    setGrades: (state, action: PayloadAction<GradeRow[]>) => {
      state.grades = action.payload
    },
    setSubjects: (state, action: PayloadAction<SubjectRow[]>) => {
      state.subjects = action.payload
    },
    setMetadata: (state, action: PayloadAction<AcademicMetadata>) => {
      state.metadata = action.payload
    },
  },
})

export default academicSlice.reducer
