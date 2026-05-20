import type { AttendanceRecord } from '@/entities/attendance/types'

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'att_1',
    studentId: 'student_1',
    studentName: 'Pavitar Singh',
    rollNumber: 'ST-0092',
    className: 'Grade 10-A',
    teacherId: 'teacher_emma',
    date: '2026-05-20',
    status: 'Present',
    checkInTime: '08:42 AM',
  },
  {
    id: 'att_2',
    studentId: 'student_2',
    studentName: 'Emma Watson',
    rollNumber: 'ST-0093',
    className: 'Grade 12-B',
    teacherId: 'teacher_clark',
    date: '2026-05-20',
    status: 'Present',
    checkInTime: '08:45 AM',
  },
  {
    id: 'att_3',
    studentId: 'student_3',
    studentName: 'John Doe',
    rollNumber: 'ST-0094',
    className: 'Grade 9-A',
    teacherId: 'teacher_emma',
    date: '2026-05-20',
    status: 'Absent',
    checkInTime: '-',
  },
]
