'use client'

import React, { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppDataGrid, AppCard, FormInput, FormSubmitButton, AppDataDisplay } from '@/shared/ui'
import { createStudentSchema, CreateStudentInput } from '@/features/create-student/model/schema'
import { useRbac } from '@/entities/permission'

const initialStudents = [
  { id: '1', rollNumber: 'ST-0092', name: 'Pavitar Singh', email: 'pavitar@erp.com', class: 'Grade 10-A', date: '12 May 2026' },
  { id: '2', rollNumber: 'ST-0093', name: 'Emma Watson', email: 'emma@erp.com', class: 'Grade 12-B', date: '14 May 2026' },
  { id: '3', rollNumber: 'ST-0094', name: 'John Doe', email: 'john@erp.com', class: 'Grade 9-A', date: '15 May 2026' },
  { id: '4', rollNumber: 'ST-0095', name: 'Alice Smith', email: 'alice@erp.com', class: 'Grade 11-C', date: '18 May 2026' },
  { id: '5', rollNumber: 'ST-0096', name: 'Bob Johnson', email: 'bob@erp.com', class: 'Grade 10-B', date: '19 May 2026' },
]

export default function StudentsPage() {
  const { hasPermission, role, user } = useRbac()
  const [students, setStudents] = useState(initialStudents)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load students from localStorage safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('students_data')
      if (saved) {
        try {
          setStudents(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse students data', e)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save students to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('students_data', JSON.stringify(students))
    }
  }, [students, isLoaded])

  // Details and edit states
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<typeof initialStudents[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Intercept browser back button for Create dialog
  useEffect(() => {
    if (isDialogOpen) {
      window.history.pushState({ dialogueOpen: 'students' }, '')

      const handlePopState = () => {
        setIsDialogOpen(false)
      }

      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        if (window.history.state?.dialogueOpen === 'students') {
          window.history.back()
        }
      }
    }
  }, [isDialogOpen])

  // Intercept browser back button for Details view/edit dialog
  useEffect(() => {
    if (isDetailsOpen) {
      window.history.pushState({ dialogueOpen: 'student-details' }, '')

      const handlePopState = () => {
        setIsDetailsOpen(false)
      }

      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        if (window.history.state?.dialogueOpen === 'student-details') {
          window.history.back()
        }
      }
    }
  }, [isDetailsOpen])

  // Forms
  const formMethods = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: '',
      email: '',
      rollNumber: '',
      classSection: '',
      enrollmentDate: '',
    },
  })

  const detailFormMethods = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
  })

  const handleOpenDialog = () => {
    formMethods.reset()
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const parseDateSafe = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0]
      }
    } catch (e) {}
    return new Date().toISOString().split('T')[0]
  }

  const handleOpenDetails = (student: typeof students[0]) => {
    setSelectedStudent(student)
    setIsEditing(false)
    detailFormMethods.reset({
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      classSection: student.class,
      enrollmentDate: parseDateSafe(student.date),
    })
    setIsDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsOpen(false)
  }

  const onSubmit = (data: CreateStudentInput) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newStudent = {
          id: Math.random().toString(),
          rollNumber: data.rollNumber,
          name: data.name,
          email: data.email,
          class: data.classSection, 
          date: new Date(data.enrollmentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }
        setStudents((prev) => [newStudent, ...prev])
        setIsDialogOpen(false)
        resolve()
      }, 1000)
    })
  }

  const onSaveDetails = (data: CreateStudentInput) => {
    if (!selectedStudent) return
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? { 
            ...s, 
            name: data.name, 
            email: data.email, 
            rollNumber: data.rollNumber,
            class: data.classSection,
            date: new Date(data.enrollmentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          } : s))
        )
        setIsDetailsOpen(false)
        resolve()
      }, 1000)
    })
  }

  const filteredStudents = students.filter((student) => {
    // 1. Parent Role Isolation: access only linked children
    if (role === 'parent') {
      const parentEmail = user?.email || 'david.miller@parent.com'
      let linkedRolls = ['ST-0092', 'ST-0094'] // default fallback for david.miller@parent.com
      if (parentEmail.toLowerCase() === 'linda.w@parent.com') {
        linkedRolls = ['ST-0093']
      }

      if (typeof window !== 'undefined') {
        const savedGuardians = localStorage.getItem('guardians_data')
        if (savedGuardians) {
          try {
            const list = JSON.parse(savedGuardians)
            const match = list.find((g: any) => g.email.toLowerCase() === parentEmail.toLowerCase())
            if (match) {
              linkedRolls = match.linkedStudentRolls
            }
          } catch (e) {
            console.error('Failed to parse guardians_data', e)
          }
        }
      }

      const isLinked = linkedRolls.includes(student.rollNumber)
      if (!isLinked) return false
    }

    // 2. Teacher Role Isolation: access only assigned classes
    if (role === 'teacher') {
      const teacherEmail = user?.email || 'emma.w@erp.com'
      let assignedClasses = ['Grade 10-A', 'Grade 9-B'] // default fallback for emma.w@erp.com

      if (typeof window !== 'undefined') {
        const savedTeachers = localStorage.getItem('teachers_data')
        if (savedTeachers) {
          try {
            const list = JSON.parse(savedTeachers)
            const match = list.find((t: any) => t.email.toLowerCase() === teacherEmail.toLowerCase())
            if (match) {
              assignedClasses = match.assignedClasses
            }
          } catch (e) {
            console.error('Failed to parse teachers_data', e)
          }
        }
      }

      const isClassMatch = assignedClasses.some(c => student.class.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(student.class.toLowerCase()))
      if (!isClassMatch) return false
    }

    // Default search filter
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const columns = [
    { field: 'rollNumber', headerName: 'Roll No', width: 120 },
    { field: 'name', headerName: 'Student Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email Address', flex: 1.2, minWidth: 200 },
    { field: 'class', headerName: 'Class Section', width: 150 },
    { field: 'date', headerName: 'Enrollment Date', width: 150 },
  ]

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Students' },
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title="Student Admissions Registry"
        subtitle="Manage and track active student enrollment rosters, records, and search registers."
        breadcrumbs={breadcrumbs}
        action={
          hasPermission('student:create') ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                py: 1.2,
                fontWeight: 700,
                boxShadow: '0px 4px 14px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0px 6px 20px rgba(25, 118, 210, 0.4)',
                },
              }}
            >
              Enroll New Student
            </Button>
          ) : undefined
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Actions search panel */}
          <AppCard>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Search students by name, email or roll number..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </AppCard>

          <AppDataDisplay
            rows={filteredStudents}
            columns={columns}
            renderMobileCard={(student) => (
              <Card 
                key={student.id} 
                onClick={() => handleOpenDetails(student)}
                elevation={0}
                sx={{ 
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1.5,
                  bgcolor: 'background.paper',
                  transition: 'all 0.15s ease',
                  '&:hover': { 
                    borderColor: 'primary.main',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.02)'
                  }
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 24, height: 24, fontSize: '0.675rem', fontWeight: 700 }}>
                        {student.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" fontWeight="700" color="text.primary">
                        {student.name}
                      </Typography>
                    </Box>
                    <Chip label={student.rollNumber} size="small" color="primary" sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    Email: {student.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Class: {student.class} | Date: {student.date}
                  </Typography>
                </CardContent>
              </Card>
            )}
            onRowClick={(student) => handleOpenDetails(student)}
            emptyMessage="No student records found matching search queries."
          />
        </Box>

        {/* Enroll New Student Dialog */}
        <Dialog 
          open={isDialogOpen} 
          onClose={handleCloseDialog} 
          fullScreen={isMobile}
          maxWidth="xs" 
          fullWidth 
          PaperProps={{ sx: isMobile ? {} : { borderRadius: 3, p: 1 } }}
        >
          <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={handleCloseDialog} edge="start" color="inherit" aria-label="close" sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            Enroll New Student
          </DialogTitle>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                <FormInput name="name" label="Full Name" placeholder="e.g. Johnathan Doe" fullWidth required />
                <FormInput name="email" label="Email Address" type="email" placeholder="e.g. john@domain.com" fullWidth required />
                <FormInput name="rollNumber" label="Roll Number" placeholder="e.g. ST-0105" fullWidth required />
                <FormInput name="classSection" label="Grade / Class Section" placeholder="e.g. Grade 10-A" fullWidth required />
                <FormInput name="enrollmentDate" label="Date of Enrollment" type="date" InputLabelProps={{ shrink: true }} fullWidth required />
              </DialogContent>
              <DialogActions sx={{ p: 2.5, gap: 1 }}>
                <Button onClick={handleCloseDialog} color="inherit" sx={{ fontWeight: 600 }}>
                  Cancel
                </Button>
                <FormSubmitButton sx={{ py: 1, px: 3, fontWeight: 700 }}>
                  Enroll Student
                </FormSubmitButton>
              </DialogActions>
            </form>
          </FormProvider>
        </Dialog>

        {/* Student View / Edit Dialog */}
        <Dialog 
          open={isDetailsOpen} 
          onClose={handleCloseDetails} 
          fullScreen={isMobile}
          maxWidth="xs" 
          fullWidth 
          PaperProps={{ sx: isMobile ? {} : { borderRadius: 3, p: 1 } }}
        >
          <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={handleCloseDetails} edge="start" color="inherit" aria-label="close" sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {isEditing ? 'Edit Student Details' : 'Student Registry File'}
          </DialogTitle>
          <FormProvider {...detailFormMethods}>
            <form onSubmit={detailFormMethods.handleSubmit(onSaveDetails)}>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                {isEditing ? (
                  <>
                    <FormInput name="name" label="Full Name" placeholder="e.g. Johnathan Doe" fullWidth required />
                    <FormInput name="email" label="Email Address" type="email" placeholder="e.g. john@domain.com" fullWidth required />
                    <FormInput name="rollNumber" label="Roll Number" placeholder="e.g. ST-0105" fullWidth required />
                    <FormInput name="classSection" label="Grade / Class Section" placeholder="e.g. Grade 10-A" fullWidth required />
                    <FormInput name="enrollmentDate" label="Date of Enrollment" type="date" InputLabelProps={{ shrink: true }} fullWidth required />
                  </>
                ) : (
                  selectedStudent && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 1 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 80, height: 80, fontSize: '2rem', fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        {selectedStudent.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>FULL NAME</Typography>
                          <Typography variant="body1" fontWeight={600}>{selectedStudent.name}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>EMAIL ADDRESS</Typography>
                          <Typography variant="body1" fontWeight={600}>{selectedStudent.email}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>ROLL NUMBER / ASSIGNMENT</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            <Chip label={selectedStudent.rollNumber} size="small" color="primary" sx={{ fontWeight: 700, borderRadius: 1 }} />
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>CLASS DIVISION</Typography>
                          <Typography variant="body1" fontWeight={600}>{selectedStudent.class}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>ENROLLMENT TIMESTAMP</Typography>
                          <Typography variant="body1" fontWeight={600}>{selectedStudent.date}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
              </DialogContent>
              <DialogActions sx={{ p: 2.5, gap: 1 }}>
                {isEditing ? (
                  <>
                    <Button onClick={() => setIsEditing(false)} color="inherit" sx={{ fontWeight: 600 }}>
                      Back to View
                    </Button>
                    <FormSubmitButton sx={{ py: 1, px: 3, fontWeight: 700 }}>
                      Save Changes
                    </FormSubmitButton>
                  </>
                ) : (
                  <>
                    <Button onClick={handleCloseDetails} color="inherit" sx={{ fontWeight: 600 }}>
                      Close File
                    </Button>
                    {hasPermission('student:update') && (
                      <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ py: 1, px: 3, fontWeight: 700 }}>
                        Edit File
                      </Button>
                    )}
                  </>
                )}
              </DialogActions>
            </form>
          </FormProvider>
        </Dialog>
      </PageContainer>
    </DashboardLayout>
  )
}
