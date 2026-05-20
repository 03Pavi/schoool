export type UserRole =
  | 'super-admin'
  | 'principal'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'librarian'

export type Permission =
  // Student module permissions
  | 'student:view'
  | 'student:create'
  | 'student:update'
  | 'student:delete'
  // Teacher module permissions
  | 'teacher:view'
  | 'teacher:create'
  | 'teacher:update'
  | 'teacher:delete'
  // Guardian module permissions
  | 'guardian:view'
  | 'guardian:create'
  | 'guardian:update'
  | 'guardian:delete'
  // Attendance module permissions
  | 'attendance:view'
  | 'attendance:mark'
  | 'attendance:update'
  // Fees module permissions
  | 'fees:view'
  | 'fees:create'
  | 'fees:update'
  // Exam module permissions
  | 'exam:view'
  | 'exam:publish'
  // Homework module permissions
  | 'homework:view'
  | 'homework:create'
  | 'homework:grade'
  // Class module permissions
  | 'class:view'
  | 'class:assign'
  // Grade module permissions
  | 'grade:view'
  | 'grade:create'
  | 'grade:update'
  | 'grade:delete'
  // Subject module permissions
  | 'subject:view'
  | 'subject:create'
  | 'subject:update'
  | 'subject:delete'
  // Settings & System permissions
  | 'system:full-access'
