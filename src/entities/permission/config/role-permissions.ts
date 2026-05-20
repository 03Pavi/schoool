import { UserRole, Permission } from '../types'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  'super-admin': ['system:full-access'],
  'principal': [
    'student:view',
    'student:create',
    'student:update',
    'attendance:view',
    'attendance:mark',
    'attendance:update',
    'fees:view',
    'fees:create',
    'fees:update',
    'exam:view',
    'exam:publish',
    'homework:view',
    'class:view',
    'class:assign',
    'grade:view',
    'grade:create',
    'grade:update',
    'grade:delete',
    'subject:view',
    'subject:create',
    'subject:update',
    'subject:delete'
  ],
  'teacher': [
    'student:view',
    'class:view',
    'grade:view',
    'subject:view',
    'attendance:view',
    'attendance:mark',
    'attendance:update',
    'exam:view',
    'exam:publish',
    'homework:view',
    'homework:create',
    'homework:grade'
  ],
  'student': [
    'student:view',
    'class:view',
    'grade:view',
    'subject:view',
    'attendance:view',
    'exam:view',
    'homework:view'
  ],
  'parent': [
    'student:view',
    'attendance:view',
    'exam:view'
  ],
  'accountant': [
    'student:view',
    'fees:view',
    'fees:create',
    'fees:update'
  ],
  'librarian': [
    'student:view'
  ]
}
