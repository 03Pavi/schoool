import { baseApi } from '@/shared/api/base-api'
import { Student } from '../types'
import { AttendanceRecord } from '@/entities/attendance/types'
import { ApiResponse } from '@/shared/api/contracts'

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query<Student[], void>({
      query: () => '/students',
      transformResponse: (response: ApiResponse<Student[]>) => response.data ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student' as const, id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudentById: build.query<Student, string>({
      query: (id) => `/students/${id}`,
      transformResponse: (response: ApiResponse<Student>) => response.data as Student,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    getStudentAttendance: build.query<AttendanceRecord[], { studentId: string; page?: number; limit?: number }>({
      query: ({ studentId, page = 1, limit = 10 }) =>
        `/students/${studentId}/attendance?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<AttendanceRecord[]>) => response.data ?? [],
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.studentId }],
    }),
  }),
})

export const { useGetStudentsQuery, useGetStudentByIdQuery, useGetStudentAttendanceQuery } = studentApi
export default studentApi
