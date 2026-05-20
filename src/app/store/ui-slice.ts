import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserRole, Permission } from '@/entities/permission/types'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface UiState {
  themeMode: 'light' | 'dark'
  sidebarCollapsed: boolean
  notifications: Notification[]
  permissions: string[]
  auth: {
    user: { name: string; email: string; role: UserRole } | null
    isAuthenticated: boolean
  }
  rolePermissions: Record<UserRole, Permission[]>
}

export const defaultRolePermissions: Record<UserRole, Permission[]> = {
  'super-admin': ['system:full-access'],
  'principal': [
    'student:view', 'student:create', 'student:update', 'student:delete',
    'teacher:view', 'teacher:create', 'teacher:update', 'teacher:delete',
    'guardian:view', 'guardian:create', 'guardian:update', 'guardian:delete',
    'attendance:view', 'attendance:mark', 'attendance:update',
    'fees:view', 'fees:create', 'fees:update',
    'exam:view', 'exam:publish',
    'homework:view', 'homework:create', 'homework:grade',
    'class:view', 'class:assign',
    'grade:view', 'grade:create', 'grade:update', 'grade:delete',
    'subject:view', 'subject:create', 'subject:update', 'subject:delete'
  ],
  'teacher': [
    'student:view',
    'teacher:view',
    'guardian:view',
    'attendance:view', 'attendance:mark', 'attendance:update',
    'exam:view', 'exam:publish',
    'homework:view', 'homework:create', 'homework:grade',
    'class:view',
    'grade:view',
    'subject:view'
  ],
  'student': [
    'student:view',
    'attendance:view',
    'exam:view',
    'homework:view',
    'grade:view',
    'subject:view',
    'class:view'
  ],
  'parent': [
    'student:view',
    'attendance:view',
    'exam:view'
  ],
  'accountant': [
    'student:view',
    'fees:view', 'fees:create', 'fees:update'
  ],
  'librarian': [
    'student:view'
  ]
}

const initialState: UiState = {
  themeMode: 'light',
  sidebarCollapsed: false,
  notifications: [],
  permissions: ['super-admin'],
  auth: {
    user: { name: 'Pavitar Singh', email: 'pavitar@erp.com', role: 'super-admin' },
    isAuthenticated: true,
  },
  rolePermissions: defaultRolePermissions,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.themeMode)
      }
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', action.payload)
      }
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarCollapsed', String(state.sidebarCollapsed))
      }
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarCollapsed', String(action.payload))
      }
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
      })
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ name: string; email: string; role: UserRole }>) => {
      state.auth.user = action.payload
      state.auth.isAuthenticated = true
      state.permissions = [action.payload.role]
      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(action.payload))
        localStorage.setItem('isAuthenticated', 'true')
      }
    },
    logout: (state) => {
      state.auth.user = null
      state.auth.isAuthenticated = false
      state.permissions = []
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authUser')
        localStorage.setItem('isAuthenticated', 'false')
      }
    },
    updateRolePermissions: (state, action: PayloadAction<{ role: UserRole; permissions: Permission[] }>) => {
      const { role, permissions } = action.payload
      state.rolePermissions[role] = permissions
      if (typeof window !== 'undefined') {
        localStorage.setItem('rolePermissions', JSON.stringify(state.rolePermissions))
      }
    },
    createCustomRole: (state, action: PayloadAction<{ roleName: string; permissions: Permission[] }>) => {
      const roleKey = action.payload.roleName.toLowerCase().trim().replace(/\s+/g, '-') as UserRole
      state.rolePermissions[roleKey] = action.payload.permissions
      if (typeof window !== 'undefined') {
        localStorage.setItem('rolePermissions', JSON.stringify(state.rolePermissions))
      }
    },
    deleteCustomRole: (state, action: PayloadAction<UserRole>) => {
      if (action.payload !== 'super-admin' && action.payload !== 'principal') {
        delete state.rolePermissions[action.payload]
        if (typeof window !== 'undefined') {
          localStorage.setItem('rolePermissions', JSON.stringify(state.rolePermissions))
        }
      }
    },
    hydrateUiSettings: (state) => {
      if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('themeMode')
        if (theme === 'light' || theme === 'dark') {
          state.themeMode = theme
        }
        const sidebar = localStorage.getItem('sidebarCollapsed')
        if (sidebar !== null) {
          state.sidebarCollapsed = sidebar === 'true'
        }
        const authUser = localStorage.getItem('authUser')
        const authIsAuthenticated = localStorage.getItem('isAuthenticated')
        if (authUser && authIsAuthenticated === 'true') {
          try {
            state.auth.user = JSON.parse(authUser)
            state.auth.isAuthenticated = true
            state.permissions = [state.auth.user!.role]
          } catch (e) {
            console.error('Failed to parse authUser from localStorage', e)
          }
        }
        const savedPermissions = localStorage.getItem('rolePermissions')
        if (savedPermissions) {
          try {
            state.rolePermissions = JSON.parse(savedPermissions)
          } catch (e) {
            console.error('Failed to parse rolePermissions', e)
          }
        }
      }
    },
  },
})

export const {
  toggleTheme,
  setThemeMode,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  clearNotification,
  setPermissions,
  loginSuccess,
  logout,
  updateRolePermissions,
  createCustomRole,
  deleteCustomRole,
  hydrateUiSettings,
} = uiSlice.actions

export default uiSlice.reducer
