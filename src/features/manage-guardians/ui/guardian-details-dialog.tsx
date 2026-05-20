'use client'

import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { Guardian } from '@/shared/mock/guardians.mock'
import { StudentDirectoryItem } from '@/shared/mock/students.mock'

interface GuardianDetailsDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  selectedGuardian: Guardian | null
  students: StudentDirectoryItem[]
}

export const GuardianDetailsDialog: React.FC<GuardianDetailsDialogProps> = ({
  open,
  onClose,
  isMobile,
  selectedGuardian,
  students,
}) => {
  if (!selectedGuardian) return null

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: isMobile ? {} : { borderRadius: 4, p: 2 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1.5 }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 44, height: 44, fontSize: '1.25rem', fontWeight: 800 }}>
          {selectedGuardian.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="800">
            {selectedGuardian.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Emergency Household Contact Card
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              RELATIONSHIP
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedGuardian.relation}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              PRIMARY PHONE
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedGuardian.phone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              SECONDARY PHONE (EMERGENCY)
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedGuardian.altPhone || 'Not Specified'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              EMAIL ADDRESS
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedGuardian.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary" display="block">
              RESIDENTIAL ADDRESS
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedGuardian.address}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Box>
          <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 1, color: 'text.primary' }}>
            LINKED HOUSEHOLD CHILDREN
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {selectedGuardian.linkedStudentRolls.map((roll: string) => {
              const studentObj = students.find((s) => s.rollNumber === roll)
              return (
                <Paper key={roll} variant="outlined" sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
                  <Box>
                    <Typography variant="body2" fontWeight="700">
                      {studentObj?.name || 'Unknown Student'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Roll Number: {roll}
                    </Typography>
                  </Box>
                  <Chip label={studentObj?.classSection || 'N/A'} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
                </Paper>
              )
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ py: 0.8, px: 3, fontWeight: 700 }}>
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  )
}
