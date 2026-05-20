export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  rollNumber: string
  className: string
  teacherId?: string
  date: string
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
  checkInTime: string
}
