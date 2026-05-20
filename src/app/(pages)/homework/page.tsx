'use client'

import React from 'react'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'
import { useAppDispatch } from '@/shared/hooks'
import {
  AssignmentRow,
  deleteAssignmentThunk,
  deleteAssignmentsFailed,
  deleteAssignmentsSucceeded,
  fetchAssignmentsFailed,
  fetchAssignmentsSucceeded,
  fetchAssignmentsThunk,
} from '@/features/assignments/model/actions'

export default function HomeworkPage() {
  const dispatch = useAppDispatch()
  const [rows, setRows] = React.useState<AssignmentRow[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const loadAssignments = React.useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const data = await dispatch(fetchAssignmentsThunk({ page: 1, limit: 10 })).unwrap()
      setRows(data)
      dispatch(fetchAssignmentsSucceeded(data))
    } catch (error: any) {
      const message = error || 'Failed to fetch assignments'
      setErrorMessage(message)
      dispatch(fetchAssignmentsFailed(message))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  React.useEffect(() => {
    loadAssignments()
  }, [loadAssignments])

  const handleDelete = async (id: string) => {
    try {
      const deleted = await dispatch(deleteAssignmentThunk({ id })).unwrap()
      setRows((prev) => prev.filter((row) => row.id !== deleted.id))
      dispatch(deleteAssignmentsSucceeded(deleted))
    } catch (error: any) {
      dispatch(deleteAssignmentsFailed(error || 'Failed to delete assignment'))
      setErrorMessage(error || 'Failed to delete assignment')
    }
  }

  const columns = [
    { field: 'hwCode', headerName: 'Homework Code', width: 120 },
    { field: 'title', headerName: 'Assignment Title', flex: 1, minWidth: 150 },
    { field: 'class', headerName: 'Class Section', width: 130 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    {
      field: 'status',
      headerName: 'Grading Status',
      width: 140,
      renderCell: (params: any) => {
        const val = params.value as string
        const color = val === 'Graded' ? 'success' : val === 'Assigned' ? 'primary' : 'error'
        return <Chip label={val} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 0.5 }} />
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 110,
      renderCell: (params: any) => (
        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title="Homework & Assignments Portal"
        subtitle="Manage daily academic worksheets, trace student submission uploads, and review ratings."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Homework' }]}
      >
        <AppCard title="Current Home Work Assignments" subheader="Track assignment due states and grading completions.">
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage} <Button size="small" onClick={loadAssignments}>Retry</Button>
            </Alert>
          )}
          <AppDataDisplay
            rows={rows}
            columns={columns}
            loading={isLoading}
            emptyMessage="No assignments found."
            renderMobileCard={(homework) => {
              const val = homework.status
              const color = val === 'Graded' ? 'success' : val === 'Assigned' ? 'primary' : 'error'
              return (
                <Card 
                  key={homework.id}
                  elevation={0}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    bgcolor: 'background.paper',
                    mb: 1
                  }}
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="700" color="text.primary">
                          {homework.title}
                        </Typography>
                      </Box>
                      <Chip label={val} color={color} size="small" sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Code: {homework.hwCode} | Due: {homework.dueDate}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography variant="caption" fontWeight="700" color="text.primary">
                          {homework.class}
                        </Typography>
                        <IconButton size="small" color="error" onClick={() => handleDelete(homework.id)}>
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )
            }}
          />
        </AppCard>
      </PageContainer>
    </DashboardLayout>
  )
}
