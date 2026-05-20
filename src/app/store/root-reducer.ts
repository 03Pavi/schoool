import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/base-api'
import studentReducer from '@/entities/student/model/student-slice'
import uiReducer from '@/app/store/ui-slice'
import academicReducer from '@/features/manage-academics/model/academic-slice'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  student: studentReducer,
  ui: uiReducer,
  academic: academicReducer,
})

export type RootState = ReturnType<typeof rootReducer>
