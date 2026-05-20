import { Permission } from '../types'

export interface SidebarAccessConfig {
  path: string
  requiredPermission: Permission
}

export const SIDEBAR_ACCESS: SidebarAccessConfig[] = [
  { path: '/', requiredPermission: 'student:view' },
  { path: '/academic', requiredPermission: 'class:view' },
  { path: '/students', requiredPermission: 'student:view' },
  { path: '/teachers', requiredPermission: 'teacher:view' },
  { path: '/guardians', requiredPermission: 'guardian:view' },
  { path: '/attendance', requiredPermission: 'attendance:view' },
  { path: '/fees', requiredPermission: 'fees:view' },
  { path: '/exams', requiredPermission: 'exam:view' },
  { path: '/homework', requiredPermission: 'homework:view' },
  { path: '/transport', requiredPermission: 'student:view' },
  { path: '/settings', requiredPermission: 'system:full-access' },
]
