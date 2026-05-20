import { baseApi } from '@/shared/api/base-api'
import type { ApiResponse } from '@/shared/api/contracts'

export type RecordStatus = 'ACTIVE' | 'INACTIVE'

export interface AcademicOption {
  id: string
  name: string
}

export interface GradeRow {
  id: string
  name: string
  status: RecordStatus
  classes: AcademicOption[]
  sections: AcademicOption[]
  subjects: AcademicOption[]
}

export interface SubjectRow {
  id: string
  name: string
  code: string
  status: RecordStatus
  grades: AcademicOption[]
  classes: AcademicOption[]
  assignedTeachers: AcademicOption[]
}

export interface AcademicMetadata {
  grades: AcademicOption[]
  classes: AcademicOption[]
  sections: AcademicOption[]
  subjects: AcademicOption[]
  teachers: AcademicOption[]
}

interface GradePayload {
  name: string
  status: RecordStatus
  classIds: string[]
  sectionIds: string[]
  subjectIds: string[]
}

interface SubjectPayload {
  name: string
  code: string
  status: RecordStatus
  gradeIds: string[]
  classIds: string[]
  teacherIds: string[]
}

export const academicApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGrades: build.query<GradeRow[], void>({
      query: () => '/grades',
      transformResponse: (response: ApiResponse<GradeRow[]>) => response.data ?? [],
      providesTags: ['Academic'],
    }),
    createGrade: build.mutation<GradeRow, GradePayload>({
      query: (body) => ({ url: '/grades', method: 'POST', body }),
      transformResponse: (response: ApiResponse<GradeRow>) => response.data as GradeRow,
      invalidatesTags: ['Academic'],
    }),
    updateGrade: build.mutation<GradeRow, { id: string; payload: GradePayload }>({
      query: ({ id, payload }) => ({ url: `/grades?id=${id}`, method: 'PATCH', body: payload }),
      transformResponse: (response: ApiResponse<GradeRow>) => response.data as GradeRow,
      invalidatesTags: ['Academic'],
    }),
    deleteGrade: build.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/grades?id=${id}`, method: 'DELETE' }),
      transformResponse: () => ({ success: true }),
      invalidatesTags: ['Academic'],
    }),

    getSubjects: build.query<SubjectRow[], void>({
      query: () => '/subjects',
      transformResponse: (response: ApiResponse<SubjectRow[]>) => response.data ?? [],
      providesTags: ['Academic'],
    }),
    createSubject: build.mutation<SubjectRow, SubjectPayload>({
      query: (body) => ({ url: '/subjects', method: 'POST', body }),
      transformResponse: (response: ApiResponse<SubjectRow>) => response.data as SubjectRow,
      invalidatesTags: ['Academic'],
    }),
    updateSubject: build.mutation<SubjectRow, { id: string; payload: SubjectPayload }>({
      query: ({ id, payload }) => ({ url: `/subjects?id=${id}`, method: 'PATCH', body: payload }),
      transformResponse: (response: ApiResponse<SubjectRow>) => response.data as SubjectRow,
      invalidatesTags: ['Academic'],
    }),
    deleteSubject: build.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/subjects?id=${id}`, method: 'DELETE' }),
      transformResponse: () => ({ success: true }),
      invalidatesTags: ['Academic'],
    }),

    getAcademicMetadata: build.query<AcademicMetadata, void>({
      query: () => '/academics/metadata',
      transformResponse: (response: ApiResponse<AcademicMetadata> | AcademicMetadata) =>
        (response as ApiResponse<AcademicMetadata>).success !== undefined
          ? ((response as ApiResponse<AcademicMetadata>).data as AcademicMetadata)
          : (response as AcademicMetadata),
      providesTags: ['Academic'],
    }),
  }),
})

export const {
  useGetGradesQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useGetAcademicMetadataQuery,
} = academicApi
