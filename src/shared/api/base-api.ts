import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any
      const user = state?.ui?.auth?.user

      if (user?.role) {
        headers.set('x-user-role', user.role)
      }
      if (user?.email) {
        headers.set('x-user-email', user.email)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Student', 'Academic', 'Attendance'],
})
