import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { baseApi } from '@/shared/api/base-api'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
