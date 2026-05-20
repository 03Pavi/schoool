'use client'

import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import FilterListIcon from '@mui/icons-material/FilterList'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Divider from '@mui/material/Divider'

import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'
import { useRbac } from '@/entities/permission'
import { useAppDispatch } from '@/shared/hooks'
import { uiSlice } from '@/app/store/ui-slice'

interface AttendanceRecord {
  id: string
  rollNumber: string
  name: string
  email: string
  class: string
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
  time: string
}

const defaultStudents: AttendanceRecord[] = [
  { id: '1', rollNumber: 'ST-0092', name: 'Pavitar Singh', email: 'pavitar@erp.com', class: 'Grade 10-A', status: 'Present', time: '08:42 AM' },
  { id: '2', rollNumber: 'ST-0093', name: 'Emma Watson', email: 'emma@erp.com', class: 'Grade 12-B', status: 'Present', time: '08:45 AM' },
  { id: '3', rollNumber: 'ST-0094', name: 'John Doe', email: 'john@erp.com', class: 'Grade 9-A', status: 'Absent', time: '-' },
  { id: '4', rollNumber: 'ST-0095', name: 'Alice Smith', email: 'alice@erp.com', class: 'Grade 11-C', status: 'Late', time: '09:05 AM' },
  { id: '5', rollNumber: 'ST-0096', name: 'Bob Johnson', email: 'bob@erp.com', class: 'Grade 10-A', status: 'Present', time: '08:50 AM' },
]

export default function AttendancePage() {
  const dispatch = useAppDispatch()
  const { hasPermission, role, user } = useRbac()
  
  const [selectedClass, setSelectedClass] = useState('Grade 10-A')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchQuery, setSearchQuery] = useState('')
  
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(defaultStudents)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [scannerType, setScannerType] = useState<'qr' | 'face'>('qr')
  const [scanResult, setScanResult] = useState('')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Safe Mount Hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `attendance_${selectedClass}_${selectedDate}`
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          setAttendance(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse attendance data', e)
        }
      } else {
        // Filter initial students belonging to selected class, defaulting others
        const classFiltered = defaultStudents.map(s => {
          if (s.class === selectedClass) {
            return s
          }
          return {
            ...s,
            class: selectedClass,
            status: 'Present' as const,
            time: '08:50 AM'
          }
        })
        setAttendance(classFiltered)
      }
      setIsLoaded(true)
    }
  }, [selectedClass, selectedDate])

  // Save to LocalStorage when attendance state changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const storageKey = `attendance_${selectedClass}_${selectedDate}`
      localStorage.setItem(storageKey, JSON.stringify(attendance))
    }
  }, [attendance, isLoaded, selectedClass, selectedDate])

  // Scanner popstate hook
  useEffect(() => {
    if (isScannerOpen) {
      window.history.pushState({ dialogueOpen: 'attendance' }, '')
      const handlePopState = () => {
        setIsScannerOpen(false)
      }
      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        if (window.history.state?.dialogueOpen === 'attendance') {
          window.history.back()
        }
      }
    }
  }, [isScannerOpen])

  // Dynamic Rule Validation: Is Teacher assigned to Selected Class?
  let isTeacherAssigned = true
  let teacherClassesList: string[] = []

  if (role === 'teacher') {
    const teacherEmail = user?.email || 'emma.w@erp.com'
    let assignedClasses = ['Grade 10-A', 'Grade 9-B'] // default fallback
    
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
          console.error(e)
        }
      }
    }
    
    teacherClassesList = assignedClasses
    isTeacherAssigned = assignedClasses.some(
      (c) => c.toLowerCase().includes(selectedClass.toLowerCase()) || selectedClass.toLowerCase().includes(c.toLowerCase())
    )
  }

  // Parent isolation: get linked rolls
  let parentLinkedStudentRolls: string[] = []
  if (role === 'parent') {
    const parentEmail = user?.email || 'david.miller@parent.com'
    let rolls = ['ST-0092', 'ST-0094'] // david fallback
    if (parentEmail.toLowerCase() === 'linda.w@parent.com') {
      rolls = ['ST-0093']
    }

    if (typeof window !== 'undefined') {
      const savedGuardians = localStorage.getItem('guardians_data')
      if (savedGuardians) {
        try {
          const list = JSON.parse(savedGuardians)
          const match = list.find((g: any) => g.email.toLowerCase() === parentEmail.toLowerCase())
          if (match) {
            rolls = match.linkedStudentRolls
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    parentLinkedStudentRolls = rolls
  }

  // Filter attendance records
  const filteredAttendance = attendance.filter((student) => {
    // Parent sees only linked children
    if (role === 'parent') {
      return parentLinkedStudentRolls.includes(student.rollNumber)
    }
    // Search query matching
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleBulkMark = (status: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    if (!isTeacherAssigned && role === 'teacher') return

    setAttendance((prev) =>
      prev.map((s) => ({
        ...s,
        status,
        time: status === 'Present' ? '08:50 AM' : status === 'Late' ? '09:15 AM' : '-',
      }))
    )
    dispatch(
      uiSlice.actions.addNotification({
        message: `Successfully bulk marked class roster as ${status}!`,
        type: 'success',
      })
    )
  }

  const handleCycleStatus = (id: string, status: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    if (!isTeacherAssigned && role === 'teacher') return

    setAttendance((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        let checkInTime = '-'
        if (status === 'Present') checkInTime = '08:45 AM'
        if (status === 'Late') checkInTime = '09:10 AM'
        
        return {
          ...s,
          status,
          time: checkInTime,
        }
      })
    )
  }

  const handleOpenScanner = (type: 'qr' | 'face') => {
    if (!isTeacherAssigned && role === 'teacher') return
    setScannerType(type)
    setScanResult('')
    setIsScannerOpen(true)
    
    setTimeout(() => {
      if (type === 'qr') {
        setScanResult('Success: Student Pavitar Singh (ST-0092) checked in via QR Code!')
        setAttendance((prev) =>
          prev.map((s) => (s.rollNumber === 'ST-0092' ? { ...s, status: 'Present', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : s))
        )
      } else {
        setScanResult('Success: Face signature matches John Doe (ST-0094)! Verified.')
        setAttendance((prev) =>
          prev.map((s) => (s.rollNumber === 'ST-0094' ? { ...s, status: 'Present', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : s))
        )
      }
    }, 2000)
  }

  const stats = {
    present: filteredAttendance.filter((s) => s.status === 'Present').length,
    absent: filteredAttendance.filter((s) => s.status === 'Absent').length,
    late: filteredAttendance.filter((s) => s.status === 'Late').length,
    leave: filteredAttendance.filter((s) => s.status === 'Leave').length,
  }

  const isParent = role === 'parent'
  const isMarkingAllowed = hasPermission('attendance:mark') && isTeacherAssigned && !isParent

  const columns = [
    { field: 'rollNumber', headerName: 'Roll No', width: 120 },
    { field: 'name', headerName: 'Student Name', flex: 1.2, minWidth: 160 },
    { field: 'time', headerName: 'Check-in Time', width: 130 },
    {
      field: 'status',
      headerName: 'Attendance Status',
      width: 140,
      renderCell: (params: any) => {
        const val = params.value as string
        const color = val === 'Present' ? 'success' : val === 'Absent' ? 'error' : val === 'Late' ? 'warning' : 'info'
        return <Chip label={val} color={color} size="small" sx={{ fontWeight: 800, borderRadius: 0.5 }} />
      },
    },
    ...(isMarkingAllowed ? [{
      field: 'actions',
      headerName: 'Roll Call Action',
      flex: 1,
      minWidth: 320,
      renderCell: (params: any) => {
        const student = params.row
        return (
          <ToggleButtonGroup
            value={student.status}
            exclusive
            size="small"
            onChange={(_, val) => val && handleCycleStatus(student.id, val)}
            aria-label="student roll status group"
          >
            <ToggleButton value="Present" color="success" sx={{ py: 0.25, px: 1, fontWeight: 700, fontSize: '0.75rem' }}>P</ToggleButton>
            <ToggleButton value="Absent" color="error" sx={{ py: 0.25, px: 1, fontWeight: 700, fontSize: '0.75rem' }}>A</ToggleButton>
            <ToggleButton value="Late" color="warning" sx={{ py: 0.25, px: 1, fontWeight: 700, fontSize: '0.75rem' }}>L</ToggleButton>
            <ToggleButton value="Leave" color="info" sx={{ py: 0.25, px: 1, fontWeight: 700, fontSize: '0.75rem' }}>LV</ToggleButton>
          </ToggleButtonGroup>
        )
      }
    }] : [])
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title={isParent ? "My Household Attendance Records" : "Attendance Roster Control"}
        subtitle={isParent ? "Review real-time presence history, check-ins, and late occurrences of your kids." : "Verify daily campus check-ins, launch mock scanner terminals, and perform bulk administrative duties."}
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Attendance' }]}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Warn Teacher if unassigned */}
          {!isTeacherAssigned && role === 'teacher' && (
            <Alert severity="warning" variant="filled" sx={{ borderRadius: 3, fontWeight: 700 }}>
              Classroom Lockout: You are not assigned as the designated teacher for {selectedClass}. Attendance marking and cycle triggers have been locked.
            </Alert>
          )}

          {isParent && (
            <Alert severity="info" sx={{ borderRadius: 3, fontWeight: 600 }}>
              You are logged in with a <strong>Parent / Guardian</strong> portal clearance. You are restricted to reviewing only linked children attendance journals.
            </Alert>
          )}

          {/* Stats Analytics */}
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ borderLeft: '5px solid #10b981', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <CardContent sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={800}>PRESENT</Typography>
                    <Typography variant="h5" fontWeight="800" color="success.main">{stats.present}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ borderLeft: '5px solid #ef4444', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <CardContent sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={800}>ABSENT</Typography>
                    <Typography variant="h5" fontWeight="800" color="error.main">{stats.absent}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ borderLeft: '5px solid #f59e0b', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <CardContent sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={800}>LATE</Typography>
                    <Typography variant="h5" fontWeight="800" color="warning.main">{stats.late}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ borderLeft: '5px solid #06b6d4', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <CardContent sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={800}>APPROVED LEAVE</Typography>
                    <Typography variant="h5" fontWeight="800" color="info.main">{stats.leave}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Controls Bar */}
          <AppCard title="Class Roll Call Journals" subheader="Narrow logs by date, class segment, and name search patterns.">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center', flexGrow: 1, maxWidth: 650 }}>
                {!isParent && (
                  <TextField
                    select
                    size="small"
                    label="Class Section"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    sx={{ minWidth: 150 }}
                    InputProps={{
                      startAdornment: <FilterListIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  >
                    <MenuItem value="Grade 9-A">Grade 9-A</MenuItem>
                    <MenuItem value="Grade 10-A">Grade 10-A</MenuItem>
                    <MenuItem value="Grade 11-C">Grade 11-C</MenuItem>
                    <MenuItem value="Grade 12-B">Grade 12-B</MenuItem>
                  </TextField>
                )}

                <TextField
                  type="date"
                  label="Roll Call Date"
                  size="small"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 150 }}
                />

                <TextField
                  placeholder="Search student names..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>

              {isMarkingAllowed && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" color="success" size="small" onClick={() => handleBulkMark('Present')} sx={{ fontWeight: 700 }}>
                    Bulk Present
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleBulkMark('Absent')} sx={{ fontWeight: 700 }}>
                    Bulk Absent
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<QrCodeScannerIcon />}
                    onClick={() => handleOpenScanner('qr')}
                    sx={{ fontWeight: 700 }}
                  >
                    QR Check-in
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<FaceRetouchingNaturalIcon />}
                    onClick={() => handleOpenScanner('face')}
                    sx={{ fontWeight: 700 }}
                  >
                    Face In
                  </Button>
                </Box>
              )}
            </Box>
          </AppCard>

          {/* Roster Listing */}
          <AppCard title="Registry Roster Journals" subheader="Active student list showing physical check-ins.">
            <AppDataDisplay
              rows={filteredAttendance}
              columns={columns}
              renderMobileCard={(student) => (
                <Card 
                  key={student.id} 
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
                      <Box>
                        <Typography variant="body2" fontWeight="700" color="text.primary">
                          {student.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Roll No: {student.rollNumber} | Class: {student.class}
                        </Typography>
                      </Box>
                      <Chip 
                        label={student.status} 
                        color={student.status === 'Present' ? 'success' : student.status === 'Absent' ? 'error' : student.status === 'Late' ? 'warning' : 'info'} 
                        size="small" 
                        sx={{ fontWeight: 800, borderRadius: 0.5 }} 
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
                      Checked in at: <strong>{student.time}</strong>
                    </Typography>

                    {isMarkingAllowed && (
                      <Box>
                        <Divider sx={{ mb: 1.5 }} />
                        <ToggleButtonGroup
                          value={student.status}
                          exclusive
                          size="small"
                          fullWidth
                          onChange={(_, val) => val && handleCycleStatus(student.id, val)}
                        >
                          <ToggleButton value="Present" color="success" sx={{ py: 0.5, fontWeight: 700 }}>Present</ToggleButton>
                          <ToggleButton value="Absent" color="error" sx={{ py: 0.5, fontWeight: 700 }}>Absent</ToggleButton>
                          <ToggleButton value="Late" color="warning" sx={{ py: 0.5, fontWeight: 700 }}>Late</ToggleButton>
                          <ToggleButton value="Leave" color="info" sx={{ py: 0.5, fontWeight: 700 }}>Leave</ToggleButton>
                        </ToggleButtonGroup>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}
            />
          </AppCard>
        </Box>
      </PageContainer>

      {/* Mock Hardware Scanning dialog */}
      <Dialog 
        open={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem' }}>
          {scannerType === 'qr' ? 'Launch QR Check-in Terminal' : 'Launch Face Recognition Node'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 2 }}>
          <Box
            sx={{
              width: '100%',
              height: 200,
              borderRadius: 3,
              border: '2px dashed',
              borderColor: 'secondary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Pulsing overlay mock scanner */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: 4,
                bgcolor: 'secondary.main',
                animation: 'scanLine 2.5s infinite linear',
                '@keyframes scanLine': {
                  '0%': { top: '0%' },
                  '50%': { top: '95%' },
                  '100%': { top: '0%' },
                },
              }}
            />
            {scannerType === 'qr' ? (
              <QrCodeScannerIcon sx={{ fontSize: 72, color: 'text.secondary', opacity: 0.5 }} />
            ) : (
              <FaceRetouchingNaturalIcon sx={{ fontSize: 72, color: 'text.secondary', opacity: 0.5 }} />
            )}
          </Box>

          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {scanResult ? 'Processing Result...' : 'Position card or face directly in front of the terminal camera...'}
            </Typography>
            {scanResult ? (
              <Alert severity="success" sx={{ fontWeight: 600, mt: 1 }}>
                {scanResult}
              </Alert>
            ) : (
              <Chip label="Node Status: Listening" color="warning" size="small" sx={{ fontWeight: 700, mt: 1 }} />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsScannerOpen(false)} variant="contained" color="inherit" sx={{ fontWeight: 700 }}>
            Close Terminal
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  )
}
