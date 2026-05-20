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
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { Teacher } from '../model/use-teachers'

interface TeacherDetailsDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  selectedTeacher: Teacher | null
}

export const TeacherDetailsDialog: React.FC<TeacherDetailsDialogProps> = ({
  open,
  onClose,
  isMobile,
  selectedTeacher,
}) => {
  if (!selectedTeacher) return null

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
          {selectedTeacher.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="800">
            {selectedTeacher.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Faculty Member ID: <strong>{selectedTeacher.teacherId}</strong>
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 2.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            DEPARTMENT DIVISION
          </Typography>
          <Typography variant="body2" fontWeight="700">
            {selectedTeacher.department}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            PROFESSIONAL QUALIFICATIONS
          </Typography>
          <Typography variant="body2" fontWeight="600" color="primary.main">
            {selectedTeacher.qualifications}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              EMAIL ADDRESS
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedTeacher.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              MOBILE CONTACT
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {selectedTeacher.phone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              FACULTY JOINING DATE
            </Typography>
            <Typography variant="body2" fontWeight="700">
              {new Date(selectedTeacher.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              EMPLOYMENT STATUS
            </Typography>
            <Chip label={selectedTeacher.status} color="success" size="small" sx={{ fontWeight: 700, borderRadius: 0.5 }} />
          </Grid>
        </Grid>
        <Divider />
        <Box>
          <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 1, color: 'text.primary' }}>
            CLASS ALLOCATIONS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedTeacher.assignedClasses.map((c) => (
              <Chip key={c} label={c} size="small" sx={{ fontWeight: 800, borderRadius: 1 }} />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 1, color: 'text.primary' }}>
            SECTION ALLOCATIONS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {(selectedTeacher.assignedSections ?? []).map((s) => (
              <Chip key={s} label={s} size="small" color="secondary" variant="outlined" sx={{ fontWeight: 800, borderRadius: 1 }} />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 1, color: 'text.primary' }}>
            SUBJECT DIVISIONS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedTeacher.assignedSubjects.map((s) => (
              <Chip key={s} label={s} size="small" color="primary" variant="outlined" sx={{ fontWeight: 800, borderRadius: 1 }} />
            ))}
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
