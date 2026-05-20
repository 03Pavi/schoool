'use client'

import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { StudentDirectoryItem } from '@/shared/mock/students.mock'

interface GuardianFormDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  formMode: 'create' | 'edit'
  onSubmit: (e: React.FormEvent) => void
  formFields: {
    name: string
    setName: (v: string) => void
    relation: string
    setRelation: (v: string) => void
    phone: string
    setPhone: (v: string) => void
    altPhone: string
    setAltPhone: (v: string) => void
    email: string
    setEmail: (v: string) => void
    address: string
    setAddress: (v: string) => void
    linkedRolls: string[]
    setLinkedRolls: (v: string[]) => void
  }
  students: StudentDirectoryItem[]
}

export const GuardianFormDialog: React.FC<GuardianFormDialogProps> = ({
  open,
  onClose,
  isMobile,
  formMode,
  onSubmit,
  formFields,
  students,
}) => {
  const {
    name, setName,
    relation, setRelation,
    phone, setPhone,
    altPhone, setAltPhone,
    email, setEmail,
    address, setAddress,
    linkedRolls, setLinkedRolls,
  } = formFields

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullScreen={isMobile}
      maxWidth="md" 
      fullWidth
      PaperProps={{ sx: isMobile ? {} : { borderRadius: 4, p: 1 } }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.35rem' }}>
          {formMode === 'create' ? 'Link Household Guardian' : 'Edit Guardian Contact Details'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Relation to Students"
                fullWidth
                required
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <MenuItem value="Father">Father</MenuItem>
                <MenuItem value="Mother">Mother</MenuItem>
                <MenuItem value="Grandparent">Grandparent</MenuItem>
                <MenuItem value="Guardian">Legal Guardian</MenuItem>
                <MenuItem value="Sibling">Older Sibling</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primary Phone Contact"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Secondary Emergency Phone (Optional)"
                fullWidth
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Residential Address"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="linked-children-label">Linked Household Children</InputLabel>
                <Select
                  labelId="linked-children-label"
                  multiple
                  value={linkedRolls}
                  onChange={(e) => setLinkedRolls(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: string) => {
                        const sName = students.find((s) => s.rollNumber === value)?.name || value
                        return <Chip key={value} label={sName} size="small" />
                      })}
                    </Box>
                  )}
                >
                  {students.map((student) => (
                    <MenuItem key={student.rollNumber} value={student.rollNumber}>
                      <Checkbox checked={linkedRolls.indexOf(student.rollNumber) > -1} />
                      <ListItemText primary={`${student.name} (${student.rollNumber} | ${student.classSection})`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ px: 4, fontWeight: 800 }}>
            {formMode === 'create' ? 'Link Profile' : 'Save Details'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
