'use client'

import React from 'react'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppDataGrid, AppCard } from '@/shared/ui'
import Chip from '@mui/material/Chip'

const columns = [
  { field: 'routeId', headerName: 'Route Code', width: 120 },
  { field: 'destination', headerName: 'Transit Route', flex: 1.2, minWidth: 200 },
  { field: 'driver', headerName: 'Bus Driver', flex: 1, minWidth: 150 },
  { field: 'vehicleNo', headerName: 'Vehicle Number', width: 150 },
  {
    field: 'status',
    headerName: 'Operational Status',
    width: 160,
    renderCell: (params: any) => {
      const val = params.value as string
      const color = val === 'On Time' ? 'success' : 'warning'
      return <Chip label={val} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 1.5 }} />
    },
  },
]

const rows = [
  { id: '1', routeId: 'RT-NORTH', destination: 'Sector 4 to Campus Main Gate', driver: 'Mr. David Beckham', vehicleNo: 'DL-1C-5482', status: 'On Time' },
  { id: '2', routeId: 'RT-SOUTH', destination: 'South Metro Station Bypass', driver: 'Mr. Lewis Hamilton', vehicleNo: 'DL-1C-9821', status: 'On Time' },
  { id: '3', routeId: 'RT-EAST', destination: 'East Central Housing Roster', driver: 'Mr. Sebastian Vettel', vehicleNo: 'DL-1C-0487', status: 'Delayed' },
]

export default function TransportPage() {
  return (
    <DashboardLayout>
      <PageContainer
        title="Campus Transport Directory"
        subtitle="Manage available shuttle transit buses, outline geographic routes, assign drivers, and trace real-time delays."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Transport' }]}
      >
        <AppCard title="Active Transport Fleet & Routes" subheader="Monitor schedule timings and assigned drivers.">
          <AppDataGrid rows={rows} columns={columns} />
        </AppCard>
      </PageContainer>
    </DashboardLayout>
  )
}
