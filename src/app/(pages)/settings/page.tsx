'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { uiSlice, defaultRolePermissions } from '@/app/store/ui-slice'
import { UserRole, Permission } from '@/entities/permission/types'
import { useRbac } from '@/entities/permission'

const permissionGroups: { groupName: string; permissions: { key: Permission; desc: string }[] }[] = [
  {
    groupName: 'Student Administration',
    permissions: [
      { key: 'student:view', desc: 'View student registry records' },
      { key: 'student:create', desc: 'Enroll/admit new students' },
      { key: 'student:update', desc: 'Modify student registry details' },
      { key: 'student:delete', desc: 'Delete or archive students' },
    ],
  },
  {
    groupName: 'Academic Faculty (Teachers)',
    permissions: [
      { key: 'teacher:view', desc: 'View teacher roster profiles' },
      { key: 'teacher:create', desc: 'Add new teacher credentials' },
      { key: 'teacher:update', desc: 'Edit teacher qualifications & fields' },
      { key: 'teacher:delete', desc: 'Archive or dismiss teachers' },
    ],
  },
  {
    groupName: 'Guardians & Contacts',
    permissions: [
      { key: 'guardian:view', desc: 'View guardian profile sheets' },
      { key: 'guardian:create', desc: 'Create new guardian contacts' },
      { key: 'guardian:update', desc: 'Edit guardian relations & phone lines' },
      { key: 'guardian:delete', desc: 'Remove or detach guardians' },
    ],
  },
  {
    groupName: 'Attendance Tracking',
    permissions: [
      { key: 'attendance:view', desc: 'View daily attendance rosters' },
      { key: 'attendance:mark', desc: 'Perform student roll call' },
      { key: 'attendance:update', desc: 'Amend retro-active check-ins' },
    ],
  },
  {
    groupName: 'Financial Control',
    permissions: [
      { key: 'fees:view', desc: 'Review student balance books' },
      { key: 'fees:create', desc: 'Generate new invoices/fees' },
      { key: 'fees:update', desc: 'Approve manual transactions' },
    ],
  },
  {
    groupName: 'Assessment & Scheduling',
    permissions: [
      { key: 'exam:view', desc: 'Review exam timetables' },
      { key: 'exam:publish', desc: 'Issue scores & publish report cards' },
    ],
  },
  {
    groupName: 'Assignments & Homework',
    permissions: [
      { key: 'homework:view', desc: 'View current assignment boards' },
      { key: 'homework:create', desc: 'Publish homework deadlines' },
      { key: 'homework:grade', desc: 'Review and grade student submissions' },
    ],
  },
  {
    groupName: 'Class Allocation & Routing',
    permissions: [
      { key: 'class:view', desc: 'View subjects and class segments' },
      { key: 'class:assign', desc: 'Bind teachers to specific classes/subjects' },
    ],
  },
]

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { role: userRole } = useRbac()
  const rolePermissions = useAppSelector((state) => state.ui.rolePermissions)

  const [selectedRole, setSelectedRole] = useState<UserRole>('principal')
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRolePermissions, setNewRolePermissions] = useState<Permission[]>([])

  // Load roles list
  const rolesList = Object.keys(rolePermissions || defaultRolePermissions) as UserRole[]

  const handleTogglePermission = (role: UserRole, permissionKey: Permission) => {
    if (role === 'super-admin') return // super-admin has full system access locked

    const currentPermissions = rolePermissions[role] || []
    let updatedPermissions: Permission[] = []

    if (currentPermissions.includes(permissionKey)) {
      updatedPermissions = currentPermissions.filter((p) => p !== permissionKey)
    } else {
      updatedPermissions = [...currentPermissions, permissionKey]
    }

    dispatch(
      uiSlice.actions.updateRolePermissions({
        role,
        permissions: updatedPermissions,
      })
    )
  }

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return

    const roleKey = newRoleName.toLowerCase().trim().replace(/\s+/g, '-') as UserRole
    if (rolesList.includes(roleKey)) {
      dispatch(
        uiSlice.actions.addNotification({
          message: `Role "${newRoleName}" already exists in registry!`,
          type: 'error',
        })
      )
      return
    }

    dispatch(
      uiSlice.actions.createCustomRole({
        roleName: newRoleName,
        permissions: newRolePermissions,
      })
    )

    dispatch(
      uiSlice.actions.addNotification({
        message: `Security role "${newRoleName}" created successfully!`,
        type: 'success',
      })
    )

    setSelectedRole(roleKey)
    setIsCreateRoleOpen(false)
    setNewRoleName('')
    setNewRolePermissions([])
  }

  const handleDeleteRole = (roleToDelete: UserRole) => {
    if (roleToDelete === 'super-admin' || roleToDelete === 'principal' || roleToDelete === 'teacher' || roleToDelete === 'student' || roleToDelete === 'parent') {
      dispatch(
        uiSlice.actions.addNotification({
          message: 'System-protected roles cannot be removed.',
          type: 'warning',
        })
      )
      return
    }

    dispatch(uiSlice.actions.deleteCustomRole(roleToDelete))
    dispatch(
      uiSlice.actions.addNotification({
        message: `Custom role "${roleToDelete}" successfully deleted.`,
        type: 'info',
      })
    )
    setSelectedRole('principal')
  }

  const handleToggleNewRolePermission = (perm: Permission) => {
    setNewRolePermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    )
  }

  const handleResetDefaults = () => {
    // Reset all permissions back to system hardcoded defaults
    Object.entries(defaultRolePermissions).forEach(([r, perms]) => {
      dispatch(
        uiSlice.actions.updateRolePermissions({
          role: r as UserRole,
          permissions: perms,
        })
      )
    })
    dispatch(
      uiSlice.actions.addNotification({
        message: 'All system security configurations restored to defaults!',
        type: 'info',
      })
    )
  }

  const activePermissions = rolePermissions[selectedRole] || []
  const isCustomRole = !['super-admin', 'principal', 'teacher', 'student', 'parent', 'accountant', 'librarian'].includes(selectedRole)

  return (
    <DashboardLayout>
      <PageContainer
        title="Access Control & Permissions"
        subtitle="Manage the ERP-wide security permission matrix, enabling granular modules for roles."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }]}
        action={
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleResetDefaults}
              sx={{ py: 1.2, fontWeight: 700 }}
            >
              Restore Defaults
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateRoleOpen(true)}
              sx={{
                py: 1.2,
                fontWeight: 700,
                boxShadow: '0px 4px 14px rgba(25, 118, 210, 0.3)',
              }}
            >
              Create New Role
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Overview */}
          <AppCard title="Administrative Access Rules" subheader="Configure module permission bindings dynamically.">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Fine-tune security access permissions for each campus registry role. Dynamic roles allow Super Admins to scale structural module boundaries, creating customizable assistants, curators, or parents.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip label="Admin: Master Control" color="error" size="small" icon={<LockIcon />} sx={{ fontWeight: 700, borderRadius: 1 }} />
              <Chip label="Configurable Roles" color="primary" size="small" icon={<CheckCircleIcon />} sx={{ fontWeight: 700, borderRadius: 1 }} />
              
              <TextField
                select
                label="Active Selected Role File"
                size="small"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                sx={{ minWidth: 240, ml: 'auto' }}
              >
                <ListSubheader sx={{ fontWeight: 800 }}>Standard System Roles</ListSubheader>
                <MenuItem value="super-admin">Super Administrator</MenuItem>
                <MenuItem value="principal">School Principal</MenuItem>
                <MenuItem value="teacher">Academic Teacher Faculty</MenuItem>
                <MenuItem value="student">Student Portal</MenuItem>
                <MenuItem value="parent">Parent Guardian Portal</MenuItem>
                <MenuItem value="accountant">Financial Accountant</MenuItem>
                <MenuItem value="librarian">Library Curator</MenuItem>
                
                {rolesList.filter(r => !['super-admin', 'principal', 'teacher', 'student', 'parent', 'accountant', 'librarian'].includes(r)).length > 0 && (
                  <>
                    <ListSubheader sx={{ fontWeight: 800 }}>Custom Added Roles</ListSubheader>
                    {rolesList
                      .filter(r => !['super-admin', 'principal', 'teacher', 'student', 'parent', 'accountant', 'librarian'].includes(r))
                      .map((role) => (
                        <MenuItem key={role} value={role} sx={{ textTransform: 'capitalize' }}>
                          {role.replace(/-/g, ' ')}
                        </MenuItem>
                      ))
                    }
                  </>
                )}
              </TextField>
              
              {isCustomRole && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteRole(selectedRole)}
                  sx={{ py: 1, fontWeight: 700, borderRadius: 1.5 }}
                >
                  Delete Role
                </Button>
              )}
            </Box>
          </AppCard>

          {/* Table Matrix */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
            <Table sx={{ minWidth: 650 }} aria-label="dynamic permission matrix table">
              <TableHead sx={{ bgcolor: (theme) => theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, py: 2 }}>Module Feature</TableCell>
                  <TableCell sx={{ fontWeight: 800, py: 2 }}>Permission String Code</TableCell>
                  <TableCell sx={{ fontWeight: 800, py: 2 }}>Feature Description</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, py: 2, width: 140 }}>
                    <Chip 
                      label={selectedRole.toUpperCase().replace(/-/g, ' ')} 
                      color={selectedRole === 'super-admin' ? 'error' : isCustomRole ? 'secondary' : 'primary'} 
                      size="small" 
                      sx={{ fontWeight: 800, borderRadius: 0.5 }} 
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissionGroups.map((group) => (
                  <React.Fragment key={group.groupName}>
                    <TableRow sx={{ bgcolor: (theme) => theme.palette.mode === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.02)' }}>
                      <TableCell colSpan={4} sx={{ fontWeight: 800, fontSize: '0.85rem', color: 'primary.main', py: 1.25, letterSpacing: '0.5px' }}>
                        {group.groupName.toUpperCase()}
                      </TableCell>
                    </TableRow>
                    {group.permissions.map((perm) => {
                      const isGranted = selectedRole === 'super-admin' || activePermissions.includes(perm.key)
                      const isLocked = selectedRole === 'super-admin'
                      return (
                        <TableRow
                          key={perm.key}
                          sx={{
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <TableCell sx={{ pl: 4, fontWeight: 700, fontSize: '0.875rem' }}>
                            {perm.key.split(':')[1].charAt(0).toUpperCase() + perm.key.split(':')[1].slice(1)} Access
                          </TableCell>
                          <TableCell>
                            <Chip label={perm.key} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.75rem', borderRadius: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                            {perm.desc}
                          </TableCell>
                          <TableCell align="center">
                            <Switch
                              checked={isGranted}
                              disabled={isLocked}
                              onChange={() => handleTogglePermission(selectedRole, perm.key)}
                              color={isCustomRole ? 'secondary' : 'primary'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PageContainer>

      {/* Create Dynamic Custom Role Dialog */}
      <Dialog 
        open={isCreateRoleOpen} 
        onClose={() => setIsCreateRoleOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.35rem' }}>
          Create Dynamic Campus Role
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1.5 }}>
          <TextField
            label="Role Label Name"
            placeholder="e.g. Vice Principal, Academic Counselor, Head Accountant"
            fullWidth
            required
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            helperText="Custom roles will be instantly registered in the system catalog and route security maps."
          />
          
          <Divider />
          
          <Typography variant="subtitle2" fontWeight="800" color="primary.main">
            SELECT MODULE ACCESS PERMISSIONS
          </Typography>
          
          <Grid container spacing={2.5}>
            {permissionGroups.map((group) => (
              <Grid item xs={12} sm={6} key={group.groupName}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                  <Typography variant="body2" fontWeight="800" sx={{ mb: 1, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 }}>
                    {group.groupName}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {group.permissions.map((perm) => (
                      <FormControlLabel
                        key={perm.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={newRolePermissions.includes(perm.key)}
                            onChange={() => handleToggleNewRolePermission(perm.key)}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
                              {perm.key}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', display: 'block' }}>
                              {perm.desc}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setIsCreateRoleOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateRole} 
            disabled={!newRoleName.trim()}
            sx={{ py: 1, px: 3, fontWeight: 800 }}
          >
            Create Security Role
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  )
}
