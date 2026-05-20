'use client'

import React from 'react'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppDataGrid, AppCard } from '@/shared/ui'
import Chip from '@mui/material/Chip'

const columns = [
  { field: 'bookId', headerName: 'Book ID', width: 120 },
  { field: 'title', headerName: 'Book Title', flex: 1.2, minWidth: 200 },
  { field: 'author', headerName: 'Author', flex: 1, minWidth: 150 },
  { field: 'category', headerName: 'Subject Category', width: 150 },
  {
    field: 'status',
    headerName: 'Stock Status',
    width: 140,
    renderCell: (params: any) => {
      const val = params.value as string
      const color = val === 'Available' ? 'success' : 'error'
      return <Chip label={val} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 1.5 }} />
    },
  },
]

const rows = [
  { id: '1', bookId: 'BK-0912', title: 'Advanced Calculus Vol. 2', author: 'Dr. Michael Spivak', category: 'Mathematics', status: 'Available' },
  { id: '2', bookId: 'BK-0913', title: 'Concepts of Physics Part I', author: 'Dr. H.C. Verma', category: 'Physics', status: 'Available' },
  { id: '3', bookId: 'BK-0914', title: 'Introduction to Organic Reactions', author: 'Prof. Jerry March', category: 'Chemistry', status: 'Borrowed' },
  { id: '4', bookId: 'BK-0915', title: 'Hamlet - Comprehensive Edition', author: 'William Shakespeare', category: 'Literature', status: 'Available' },
]

export default function LibraryPage() {
  return (
    <DashboardLayout>
      <PageContainer
        title="Digital Library Catalog"
        subtitle="Manage available books registry, track active issues/returns, and monitor overdue fine logs."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Library' }]}
      >
        <AppCard title="Campus Books Registry" subheader="Monitor catalog volumes and checkout distributions.">
          <AppDataGrid rows={rows} columns={columns} />
        </AppCard>
      </PageContainer>
    </DashboardLayout>
  )
}
