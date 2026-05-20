import { Permission } from '../types'

export const DASHBOARD_WIDGETS = {
  statsCards: {
    revenue: 'fees:view' as Permission,
    teachers: 'student:view' as Permission,
    students: 'student:view' as Permission,
    attendance: 'attendance:view' as Permission,
  },
  attendanceChart: 'attendance:view' as Permission,
  feeChart: 'fees:view' as Permission,
  recentStudents: 'student:view' as Permission,
  activityFeed: 'student:view' as Permission,
  noticesBoard: 'student:view' as Permission,
}
