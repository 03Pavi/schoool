import type { NextRequest } from 'next/server'
import type { Permission, UserRole } from '@/entities/permission/types'

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  'super-admin': ['system:full-access'],
  principal: [
    'student:view', 'student:create', 'student:update', 'student:delete',
    'teacher:view', 'teacher:create', 'teacher:update', 'teacher:delete',
    'guardian:view', 'guardian:create', 'guardian:update', 'guardian:delete',
    'attendance:view', 'attendance:mark', 'attendance:update',
    'fees:view', 'fees:create', 'fees:update',
    'exam:view', 'exam:publish',
    'homework:view', 'homework:create', 'homework:grade',
    'class:view', 'class:assign',
    'grade:view', 'grade:create', 'grade:update', 'grade:delete',
    'subject:view', 'subject:create', 'subject:update', 'subject:delete',
  ],
  teacher: [
    'student:view', 'teacher:view', 'guardian:view',
    'attendance:view', 'attendance:mark', 'attendance:update',
    'exam:view', 'exam:publish',
    'homework:view', 'homework:create', 'homework:grade',
    'class:view', 'grade:view', 'subject:view',
  ],
  student: ['student:view', 'attendance:view', 'exam:view', 'homework:view', 'class:view', 'grade:view', 'subject:view'],
  parent: ['student:view', 'attendance:view', 'exam:view'],
  accountant: ['student:view', 'fees:view', 'fees:create', 'fees:update'],
  librarian: ['student:view'],
}

export const getRequestRole = (request: NextRequest): UserRole | null => {
  const role = request.headers.get('x-user-role') as UserRole | null
  return role && ROLE_PERMISSIONS[role] ? role : null
}

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  if (role === 'super-admin') return true
  const permissions = ROLE_PERMISSIONS[role] ?? []
  return permissions.includes(permission) || permissions.includes('system:full-access')
}
