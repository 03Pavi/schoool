'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'

const columns = [
  { field: 'invoiceNo', headerName: 'Invoice No', width: 130 },
  { field: 'student', headerName: 'Student Name', flex: 1, minWidth: 150 },
  { field: 'amount', headerName: 'Amount Due', width: 140 },
  { field: 'dueDate', headerName: 'Due Date', width: 150 },
  {
    field: 'status',
    headerName: 'Payment Status',
    width: 150,
    renderCell: (params: any) => {
      const val = params.value as string
      const color = val === 'Paid' ? 'success' : val === 'Unpaid' ? 'error' : 'warning'
      return <Chip label={val} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 0.5 }} />
    },
  },
]

const rows = [
  { id: '1', invoiceNo: 'INV-2026-01', student: 'Pavitar Singh', amount: '$1,200', dueDate: '15 June 2026', status: 'Paid' },
  { id: '2', invoiceNo: 'INV-2026-02', student: 'Emma Watson', amount: '$2,400', dueDate: '18 June 2026', status: 'Paid' },
  { id: '3', invoiceNo: 'INV-2026-03', student: 'John Doe', amount: '$1,200', dueDate: '20 June 2026', status: 'Unpaid' },
  { id: '4', invoiceNo: 'INV-2026-04', student: 'Alice Smith', amount: '$1,800', dueDate: '25 June 2026', status: 'Pending' },
]

export default function FeesPage() {
  return (
    <DashboardLayout>
      <PageContainer
        title="Tuition Fee Management"
        subtitle="Track invoice generations, installment records, discounts, and payment history logs."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Fees' }]}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Stats Summary */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderLeft: '3px solid #10b981' }}>
                <CardContent sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>TOTAL COLLECTED</Typography>
                    <Typography variant="h5" fontWeight={800} color="success.main">$3,600</Typography>
                  </Box>
                  <CreditScoreIcon sx={{ fontSize: 28, color: 'success.light', opacity: 0.3 }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderLeft: '3px solid #ef4444' }}>
                <CardContent sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>OUTSTANDING FINES</Typography>
                    <Typography variant="h5" fontWeight={800} color="error.main">$1,200</Typography>
                  </Box>
                  <AttachMoneyIcon sx={{ fontSize: 28, color: 'error.light', opacity: 0.3 }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ borderLeft: '3px solid #f59e0b' }}>
                <CardContent sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>PENDING APPROVAL</Typography>
                    <Typography variant="h5" fontWeight={800} color="warning.main">$1,800</Typography>
                  </Box>
                  <PendingActionsIcon sx={{ fontSize: 28, color: 'warning.light', opacity: 0.3 }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <AppCard title="Billing Receipts Ledger" subheader="Monitor fee structures, installment invoices, and pending collection items.">
            <AppDataDisplay 
              rows={rows} 
              columns={columns} 
              renderMobileCard={(invoice) => {
                const val = invoice.status
                const color = val === 'Paid' ? 'success' : val === 'Unpaid' ? 'error' : 'warning'
                return (
                  <Card 
                    key={invoice.id}
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
                            {invoice.student}
                          </Typography>
                        </Box>
                        <Chip label={val} color={color} size="small" sx={{ fontSize: '0.675rem', height: 18, fontWeight: 700, borderRadius: 0.5 }} />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Invoice: {invoice.invoiceNo} | Due: {invoice.dueDate}
                        </Typography>
                        <Typography variant="body2" fontWeight="800" color="text.primary">
                          {invoice.amount}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )
              }}
            />
          </AppCard>
        </Box>
      </PageContainer>
    </DashboardLayout>
  )
}
