import { baseApi } from '@/shared/api/base-api'
import { Student } from '@/entities/student'

export const createStudentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation<Student, Omit<Student, 'id' | 'createdAt'>>({
      query: (body) => ({
        url: '/students',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
  }),
})

export const { useCreateStudentMutation } = createStudentApi
export default createStudentApi
