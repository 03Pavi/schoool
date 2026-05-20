import { ApiResponse } from '@/shared/api/contracts'
import { Student } from '@/entities/student/types'

export interface StudentDirectoryItem extends Student {
  classSection: string
}

const studentDirectory: StudentDirectoryItem[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@student.erp.local',
    rollNumber: 'ST-0092',
    classSection: 'Grade 10-A',
    createdAt: '2026-01-12T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Watson',
    email: 'jane.watson@student.erp.local',
    rollNumber: 'ST-0093',
    classSection: 'Grade 9-B',
    createdAt: '2026-01-14T10:00:00.000Z',
  },
  {
    id: '3',
    name: 'William Miller',
    email: 'william.miller@student.erp.local',
    rollNumber: 'ST-0094',
    classSection: 'Grade 10-A',
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: '4',
    name: 'Alice Smith',
    email: 'alice.smith@student.erp.local',
    rollNumber: 'ST-0095',
    classSection: 'Grade 11-C',
    createdAt: '2026-01-16T10:00:00.000Z',
  },
  {
    id: '5',
    name: 'Bob Johnson',
    email: 'bob.johnson@student.erp.local',
    rollNumber: 'ST-0096',
    classSection: 'Grade 10-B',
    createdAt: '2026-01-18T10:00:00.000Z',
  },
]

export const studentsListMockResponse: ApiResponse<Student[]> = {
  success: true,
  message: 'students list fetched',
  data: studentDirectory.map(({ classSection, ...student }) => student),
  meta: {
    page: 1,
    limit: 10,
    total: studentDirectory.length,
  },
}

export const studentDirectoryMockResponse: ApiResponse<StudentDirectoryItem[]> = {
  success: true,
  message: 'student directory fetched',
  data: studentDirectory,
  meta: {
    page: 1,
    limit: 10,
    total: studentDirectory.length,
  },
}
