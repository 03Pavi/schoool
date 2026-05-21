import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/base-api'
import studentReducer from '@/entities/student/model/student-slice'
import uiReducer from '@/app/store/ui-slice'
import academicReducer from '@/features/manage-academics/model/academic-slice'
import clipboardReducer from '@/features/clipboard/model/clipboard.slice'
import assignmentsReducer from '@/features/assignments/model/assignments-slice'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  student: studentReducer,
  ui: uiReducer,
  academic: academicReducer,
  clipboard: clipboardReducer,
  assignments: assignmentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
