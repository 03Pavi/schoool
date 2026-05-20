'use client'

import React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'
import { useRbac } from '@/entities/permission'

import { useTeachers, Teacher } from '@/features/manage-teachers/model/use-teachers'
import { TeacherFormDialog } from '@/features/manage-teachers/ui/teacher-form-dialog'
import { TeacherDetailsDialog } from '@/features/manage-teachers/ui/teacher-details-dialog'

export default function TeachersPage() {
  const { hasPermission, role } = useRbac()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const {
    filteredTeachers,
    searchQuery,
    setSearchQuery,
    isFormOpen,
    setIsFormOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    formMode,
    selectedTeacher,
    menuAnchorEl,
    activeTeacherMenu,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetails,
    handleDeleteTeacher,
    handleSubmitForm,
    formFields,
  } = useTeachers()

  const isTeacherViewOnly = role === 'teacher'

  // Columns for desktop Grid view
  const columns = [
    { field: 'teacherId', headerName: 'Teacher ID', width: 120, sortable: true },
    { field: 'name', headerName: 'Full Name', flex: 1.2, sortable: true },
    { field: 'email', headerName: 'Email Address', flex: 1.2 },
    { field: 'department', headerName: 'Department Division', flex: 1 },
    { field: 'qualifications', headerName: 'Qualifications', flex: 1.2 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params: any) => <Chip label={params.value} size="small" color="success" sx={{ fontWeight: 700, borderRadius: 0.5 }} /> },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params: any) => {
        const teacher = params.row
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" color="info" onClick={() => handleOpenDetails(teacher)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
            {!isTeacherViewOnly && hasPermission('teacher:update') && (
              <IconButton size="small" color="primary" onClick={() => handleOpenEdit(teacher)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {!isTeacherViewOnly && hasPermission('teacher:delete') && (
              <IconButton size="small" color="error" onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )
      }
    }
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title={isTeacherViewOnly ? "My Faculty Profile" : "Academic Faculty Directory"}
        subtitle={isTeacherViewOnly ? "View your registered classroom allocations, qualifications, and department fields." : "Manage campus teacher registries, qualification logs, and modular class duties."}
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Teachers' }]}
        action={
          !isTeacherViewOnly && hasPermission('teacher:create') ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              Add New Teacher
            </Button>
          ) : undefined
        }
      >
        {isTeacherViewOnly && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontWeight: 600 }}>
            Welcome back! You are logged in with a <strong>Teacher</strong> account role. As per privacy rules, you are authorized to view your own profile only.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AppCard 
            title={isTeacherViewOnly ? "Personal Profile Ledger" : "Active Academic Faculty Roster"}
            subheader={isTeacherViewOnly ? "Your official employment credentials." : "Review departmental teachers and administrative assignments."}
          >
            {!isTeacherViewOnly && (
              <TextField
                placeholder="Search teachers by ID, name, email, department..."
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <AppDataDisplay
              rows={filteredTeachers}
              columns={columns}
              renderMobileCard={(teacher) => (
                <Card 
                  key={teacher.id} 
                  elevation={0}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    mb: 1.5
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800 }}>
                          {teacher.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="700" color="text.primary">
                            {teacher.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {teacher.teacherId} | {teacher.department}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Chip label={teacher.status} size="small" color="success" sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }} />
                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, teacher)}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        <strong>Assigned Classes:</strong> {teacher.assignedClasses.join(', ')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        <strong>Assigned Sections:</strong> {(teacher.assignedSections ?? []).join(', ')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        <strong>Assigned Subjects:</strong> {teacher.assignedSubjects.join(', ')}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
            />
          </AppCard>
        </Box>
      </PageContainer>

      {/* CRUD Form Dialog */}
      <TeacherFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        isMobile={isMobile}
        formMode={formMode}
        onSubmit={handleSubmitForm}
        formFields={formFields}
      />

      {/* Details Dialog */}
      <TeacherDetailsDialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        isMobile={isMobile}
        selectedTeacher={selectedTeacher}
      />

      {/* Card Context Menu for mobile */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        {activeTeacherMenu && (
          <Box>
            <MenuItem onClick={() => { handleOpenDetails(activeTeacherMenu); handleCloseMenu() }}>
              <VisibilityIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} /> View Details
            </MenuItem>
            {!isTeacherViewOnly && hasPermission('teacher:update') && (
              <MenuItem onClick={() => { handleOpenEdit(activeTeacherMenu); handleCloseMenu() }}>
                <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> Edit Profile
              </MenuItem>
            )}
            {!isTeacherViewOnly && hasPermission('teacher:delete') && (
              <MenuItem onClick={() => { handleDeleteTeacher(activeTeacherMenu.id, activeTeacherMenu.name); handleCloseMenu() }} sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} /> Archive
              </MenuItem>
            )}
          </Box>
        )}
      </Menu>
    </DashboardLayout>
  )
}
