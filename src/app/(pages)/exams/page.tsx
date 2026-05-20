'use client'

import React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'

const columns = [
  { field: 'examCode', headerName: 'Exam Code', width: 120 },
  { field: 'name', headerName: 'Subject Paper', flex: 1, minWidth: 150 },
  { field: 'maxMarks', headerName: 'Max Marks', width: 130 },
  { field: 'examDate', headerName: 'Exam Date', width: 160 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params: any) => {
      const val = params.value as string
      const color = val === 'Completed' ? 'success' : val === 'Scheduled' ? 'info' : 'warning'
      return <Chip label={val} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 0.5 }} />
    },
  },
]

const rows = [
  { id: '1', examCode: 'EX-9A-MTH', name: 'Grade 9 Mathematics - Term 1', maxMarks: '100', examDate: '08 June 2026', status: 'Scheduled' },
  { id: '2', examCode: 'EX-10A-PHY', name: 'Grade 10 Physics - Laboratory', maxMarks: '50', examDate: '10 June 2026', status: 'Scheduled' },
  { id: '3', examCode: 'EX-12B-CHM', name: 'Grade 12 Chemistry Theory', maxMarks: '100', examDate: '04 May 2026', status: 'Completed' },
  { id: '4', examCode: 'EX-11C-ENG', name: 'Grade 11 English Literature', maxMarks: '100', examDate: '12 June 2026', status: 'Scheduled' },
]

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <PageContainer
        title="Examinations Control Board"
        subtitle="Manage academic schedules, record students grading reports, and compile final cards."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Exams' }]}
      >
        <AppCard title="Upcoming & Completed Exam Rosters" subheader="Monitor status categories and marks entries across classes.">
          <AppDataDisplay
            rows={rows}
            columns={columns}
            renderMobileCard={(exam) => {
              const val = exam.status
              const color = val === 'Completed' ? 'success' : val === 'Scheduled' ? 'info' : 'warning'
              return (
                <Card 
                  key={exam.id}
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
                          {exam.name}
                        </Typography>
                      </Box>
                      <Chip label={val} color={color} size="small" sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Code: {exam.examCode} | Date: {exam.examDate}
                      </Typography>
                      <Typography variant="caption" fontWeight="700" color="text.primary">
                        Max Marks: {exam.maxMarks}
                      </Typography>
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
