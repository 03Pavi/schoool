'use client'

import React, { useState } from 'react'
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
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '../../../shared/ui'
import { useRbac } from '@/entities/permission'

import { useAcademics } from '@/features/manage-academics/model/use-academics'
import { GradeFormDialog } from '@/features/manage-academics/ui/grade-form-dialog'
import { SubjectFormDialog } from '@/features/manage-academics/ui/subject-form-dialog'

export default function AcademicRegistryPage() {
  const { role } = useRbac()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [activeTab, setActiveTab] = useState<'grades' | 'subjects'>('grades')

  const {
    filteredGrades,
    filteredSubjects,
    searchGradeQuery,
    setSearchGradeQuery,
    searchSubjectQuery,
    setSearchSubjectQuery,
    
    // Grade states
    isGradeFormOpen,
    setIsGradeFormOpen,
    gradeFormMode,
    gradeMenuAnchor,
    activeGradeMenu,
    handleOpenGradeMenu,
    handleCloseGradeMenu,
    handleOpenGradeCreate,
    handleOpenGradeEdit,
    handleDeleteGrade,
    handleToggleGradeStatus,
    handleSubmitGradeForm,
    gradeFields,
    isLoading,
    isSaving,
    isAcademicAdmin,

    // Subject states
    isSubjectFormOpen,
    setIsSubjectFormOpen,
    subjectFormMode,
    subjectMenuAnchor,
    activeSubjectMenu,
    handleOpenSubjectMenu,
    handleCloseSubjectMenu,
    handleOpenSubjectCreate,
    handleOpenSubjectEdit,
    handleDeleteSubject,
    handleSubmitSubjectForm,
    subjectFields,
  } = useAcademics()

  // Grade Data Grid Columns
  const gradeColumns = [
    { field: 'name', headerName: 'Grade Level', flex: 1.2, sortable: true },
    {
      field: 'classes',
      headerName: 'Classes Mapped',
      flex: 1.1,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((className: string) => (
            <Chip key={className} label={className} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
          ))}
        </Box>
      ),
    },
    {
      field: 'sections',
      headerName: 'Sections Mapped',
      flex: 1.2,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((sec: string) => (
            <Chip key={sec} label={`Sec ${sec}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
          ))}
        </Box>
      ),
    },
    {
      field: 'subjects',
      headerName: 'Curriculum Subjects',
      flex: 2,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((subj: string) => (
            <Chip key={subj} label={subj} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
          ))}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'Active' ? 'success' : 'default'}
          sx={{ fontWeight: 700, borderRadius: 0.5 }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      renderCell: (params: any) => {
        const grade = params.row
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {isAcademicAdmin && (
              <>
                <IconButton size="small" color="primary" onClick={() => handleOpenGradeEdit(grade)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="info" onClick={() => handleToggleGradeStatus(grade.id)}>
                  {grade.status === 'Active' ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteGrade(grade.id, grade.name)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        )
      },
    },
  ]

  // Subject Data Grid Columns
  const subjectColumns = [
    { field: 'code', headerName: 'Code', width: 120, sortable: true },
    { field: 'name', headerName: 'Subject Name', flex: 1.2, sortable: true },
    {
      field: 'grades',
      headerName: 'Grades Mapped',
      flex: 1.2,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((g: string) => (
            <Chip key={g} label={g} size="small" sx={{ fontWeight: 600 }} />
          ))}
        </Box>
      ),
    },
    {
      field: 'assignedTeachers',
      headerName: 'Instructing Faculty',
      flex: 1.5,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((t: string) => (
            <Chip key={t} label={t} size="small" color="secondary" variant="outlined" sx={{ fontWeight: 700 }} />
          ))}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'Active' ? 'success' : 'default'}
          sx={{ fontWeight: 700, borderRadius: 0.5 }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      renderCell: (params: any) => {
        const subject = params.row
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {isAcademicAdmin && (
              <>
                <IconButton size="small" color="primary" onClick={() => handleOpenSubjectEdit(subject)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteSubject(subject.id, subject.name)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        )
      },
    },
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title="Academic Hub Registry"
        subtitle="Manage dynamic grades, normalized class sections, subject curriculums, and flexible faculty allocations."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Academic Hub' }]}
        action={
          isAcademicAdmin ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={activeTab === 'grades' ? handleOpenGradeCreate : handleOpenSubjectCreate}
              sx={{ py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              {activeTab === 'grades' ? 'Create Dynamic Grade' : 'Catalog New Subject'}
            </Button>
          ) : undefined
        }
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Dynamic Grade Structures" value="grades" sx={{ fontWeight: 700, px: 3 }} />
            <Tab label="Subject Curriculum Catalog" value="subjects" sx={{ fontWeight: 700, px: 3 }} />
          </Tabs>
        </Box>

        {!isAcademicAdmin && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontWeight: 600 }}>
            Read-Only Credentials Mode: As a <strong>{role}</strong>, you have authorization to view current grade allocations and curriculum links but cannot modify dynamic relationships.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {activeTab === 'grades' ? (
            <AppCard
              title="Active Grade Configurations"
              subheader="Review grade levels, classroom sections, and active status metrics."
            >
              <TextField
                placeholder="Search grades by name, sections, subjects..."
                size="small"
                fullWidth
                value={searchGradeQuery}
                onChange={(e) => setSearchGradeQuery(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <AppDataDisplay
                rows={filteredGrades}
                columns={gradeColumns}
                loading={isLoading}
                renderMobileCard={(grade) => (
                  <Card
                    key={grade.id}
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      mb: 1.5,
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800 }}>
                            G
                          </Avatar>
                          <Typography variant="body2" fontWeight="700" color="text.primary">
                            {grade.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Chip
                            label={grade.status}
                            size="small"
                            color={grade.status === 'Active' ? 'success' : 'default'}
                            sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }}
                          />
                          {isAcademicAdmin && (
                            <IconButton size="small" onClick={(e) => handleOpenGradeMenu(e, grade)}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <strong>Active Sections:</strong> {grade.sections.join(', ')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <strong>Subjects Mapped:</strong> {grade.subjects.join(', ')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              />
            </AppCard>
          ) : (
            <AppCard
              title="Subject Curriculum Directory"
              subheader="Review subject code profiles, instructing faculty members, and active grades."
            >
              <TextField
                placeholder="Search subject catalog by name, code, grades, teachers..."
                size="small"
                fullWidth
                value={searchSubjectQuery}
                onChange={(e) => setSearchSubjectQuery(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <AppDataDisplay
                rows={filteredSubjects}
                columns={subjectColumns}
                loading={isLoading}
                renderMobileCard={(subject) => (
                  <Card
                    key={subject.id}
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      mb: 1.5,
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800 }}>
                            {subject.code.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="700" color="text.primary">
                              {subject.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Code: {subject.code}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Chip
                            label={subject.status}
                            size="small"
                            color={subject.status === 'Active' ? 'success' : 'default'}
                            sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }}
                          />
                          {isAcademicAdmin && (
                            <IconButton size="small" onClick={(e) => handleOpenSubjectMenu(e, subject)}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <strong>Active Grades:</strong> {subject.grades.join(', ')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <strong>Assigned Instructors:</strong> {subject.assignedTeachers.join(', ')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              />
            </AppCard>
          )}
        </Box>
      </PageContainer>

      {/* Grade setup Dialog */}
      <GradeFormDialog
        open={isGradeFormOpen}
        onClose={() => setIsGradeFormOpen(false)}
        isMobile={isMobile}
        formMode={gradeFormMode}
        onSubmit={handleSubmitGradeForm}
        isSaving={isSaving}
        fields={gradeFields}
      />

      {/* Subject catalog Dialog */}
      <SubjectFormDialog
        open={isSubjectFormOpen}
        onClose={() => setIsSubjectFormOpen(false)}
        isMobile={isMobile}
        formMode={subjectFormMode}
        onSubmit={handleSubmitSubjectForm}
        isSaving={isSaving}
        fields={subjectFields}
      />

      {/* Grade context Menu for mobile cards */}
      <Menu
        anchorEl={gradeMenuAnchor}
        open={Boolean(gradeMenuAnchor)}
        onClose={handleCloseGradeMenu}
      >
        {activeGradeMenu && (
          <Box>
            <MenuItem onClick={() => { handleOpenGradeEdit(activeGradeMenu); handleCloseGradeMenu() }}>
              <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> Edit Grade
            </MenuItem>
            <MenuItem onClick={() => { handleToggleGradeStatus(activeGradeMenu.id); handleCloseGradeMenu() }}>
              {activeGradeMenu.status === 'Active' ? (
                <>
                  <ToggleOffIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} /> Disable Grade
                </>
              ) : (
                <>
                  <ToggleOnIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} /> Enable Grade
                </>
              )}
            </MenuItem>
            <MenuItem onClick={() => { handleDeleteGrade(activeGradeMenu.id, activeGradeMenu.name); handleCloseGradeMenu() }} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} /> Delete Registry
            </MenuItem>
          </Box>
        )}
      </Menu>

      {/* Subject context Menu for mobile cards */}
      <Menu
        anchorEl={subjectMenuAnchor}
        open={Boolean(subjectMenuAnchor)}
        onClose={handleCloseSubjectMenu}
      >
        {activeSubjectMenu && (
          <Box>
            <MenuItem onClick={() => { handleOpenSubjectEdit(activeSubjectMenu); handleCloseSubjectMenu() }}>
              <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> Edit Subject
            </MenuItem>
            <MenuItem onClick={() => { handleDeleteSubject(activeSubjectMenu.id, activeSubjectMenu.name); handleCloseSubjectMenu() }} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} /> Delete Subject
            </MenuItem>
          </Box>
        )}
      </Menu>
    </DashboardLayout>
  )
}
