'use client'

import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { StatsCards, AttendanceChart, FeeChart, ActivityFeed, NoticesBoard } from '@/widgets/dashboard'
import { AppCard, AppDataDisplay } from '@/shared/ui'
import { useRbac } from '@/entities/permission'

const columns = [
  { field: 'rollNumber', headerName: 'Roll No', width: 120 },
  { field: 'name', headerName: 'Student Name', flex: 1, minWidth: 150 },
  { field: 'email', headerName: 'Email Address', flex: 1.2, minWidth: 200 },
  { field: 'class', headerName: 'Class Section', width: 150 },
  { field: 'date', headerName: 'Enrollment Date', width: 150 },
]

const rows = [
  { id: '1', rollNumber: 'ST-0092', name: 'Pavitar Singh', email: 'pavitar@erp.com', class: 'Grade 10-A', date: '12 May 2026' },
  { id: '2', rollNumber: 'ST-0093', name: 'Emma Watson', email: 'emma@erp.com', class: 'Grade 12-B', date: '14 May 2026' },
  { id: '3', rollNumber: 'ST-0094', name: 'John Doe', email: 'john@erp.com', class: 'Grade 9-A', date: '15 May 2026' },
  { id: '4', rollNumber: 'ST-0095', name: 'Alice Smith', email: 'alice@erp.com', class: 'Grade 11-C', date: '18 May 2026' },
  { id: '5', rollNumber: 'ST-0096', name: 'Bob Johnson', email: 'bob@erp.com', class: 'Grade 10-B', date: '19 May 2026' },
]

export default function DashboardPage() {
  const { hasPermission } = useRbac()
  const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Dashboard' }]

  return (
    <DashboardLayout>
      <PageContainer
        title="Admin Command Center"
        subtitle="Overview of campus performance, student listings, attendance rates, and billing."
        breadcrumbs={breadcrumbs}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Top Row: Metric stats cards */}
          <StatsCards />

          {/* Middle Row: Attendance Analysis & Fee collection charts */}
          <Grid container spacing={2}>
            {hasPermission('attendance:view') && (
              <Grid item xs={12} lg={hasPermission('fees:view') ? 6 : 12}>
                <AttendanceChart />
              </Grid>
            )}
            {hasPermission('fees:view') && (
              <Grid item xs={12} lg={hasPermission('attendance:view') ? 6 : 12}>
                <FeeChart />
              </Grid>
            )}
          </Grid>

          {/* Dense Table / Mobile Card List: Recent Enrolled Students */}
          {hasPermission('student:view') && (
            <AppCard title="Recently Enrolled Students" subheader="The latest admissions register in the ERP catalog">
              <AppDataDisplay 
                rows={rows} 
                columns={columns} 
                renderMobileCard={(student) => (
                  <Card 
                    key={student.id} 
                    elevation={0}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1.5,
                      bgcolor: 'background.paper',
                      mb: 1
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
              />
            </AppCard>
          )}

          {/* Bottom Row: Activity Feed & Notices Board */}
          <Grid container spacing={2}>
            {hasPermission('student:view') && (
              <Grid item xs={12} md={6}>
                <ActivityFeed />
              </Grid>
            )}
            {hasPermission('student:view') && (
              <Grid item xs={12} md={6}>
                <NoticesBoard />
              </Grid>
            )}
          </Grid>
        </Box>
      </PageContainer>
    </DashboardLayout>
  )
}