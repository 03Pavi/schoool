import { useSelector } from 'react-redux'
import { SIDEBAR_ACCESS } from '../config/sidebar-access'
import { UserRole, Permission } from '../types'

export const useRbac = () => {
  // Extract authentication status and active role from ui state
  const auth = useSelector((state: any) => state.ui.auth)
  const rolePermissions = useSelector((state: any) => state.ui.rolePermissions)
  const role = auth?.user?.role as UserRole | undefined

  const hasPermission = (permission: Permission): boolean => {
    if (!role) return false
    if (role === 'super-admin') return true
    
    const permissions = rolePermissions?.[role] || []
    return permissions.includes(permission) || permissions.includes('system:full-access')
  }

  const canAccessRoute = (path: string): boolean => {
    if (!role) return false
    if (role === 'super-admin') return true

    const config = SIDEBAR_ACCESS.find((item) => item.path === path)
    if (!config) return true // Unprotected path

    return hasPermission(config.requiredPermission)
  }

  return {
    role,
    hasPermission,
    canAccessRoute,
    canViewSidebarItem: (path: string) => canAccessRoute(path),
    isAuthenticated: !!auth?.isAuthenticated,
    user: auth?.user,
  }
}
