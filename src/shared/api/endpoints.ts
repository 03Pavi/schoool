export const apiEndpoints = {
  students: '/students',
  studentById: (id: string) => `/students/${id}`,
  guardians: '/guardians',
} as const
