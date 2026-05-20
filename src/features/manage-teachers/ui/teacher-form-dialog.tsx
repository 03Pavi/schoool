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
import Autocomplete from '@mui/material/Autocomplete'

interface TeacherFormDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  formMode: 'create' | 'edit'
  onSubmit: (e: React.FormEvent) => void
  formFields: {
    name: string
    setName: (v: string) => void
    email: string
    setEmail: (v: string) => void
    phone: string
    setPhone: (v: string) => void
    teacherId: string
    setTeacherId: (v: string) => void
    qualifications: string
    setQualifications: (v: string) => void
    department: string
    setDepartment: (v: string) => void
    joiningDate: string
    setJoiningDate: (v: string) => void
    assignedClasses: string[]
    setAssignedClasses: (v: string[]) => void
    assignedSections: string[]
    setAssignedSections: (v: string[]) => void
    assignedSubjects: string[]
    setAssignedSubjects: (v: string[]) => void
    classOptions: string[]
    sectionOptions: string[]
    subjectOptions: string[]
  }
}

export const TeacherFormDialog: React.FC<TeacherFormDialogProps> = ({
  open,
  onClose,
  isMobile,
  formMode,
  onSubmit,
  formFields,
}) => {
  const {
    name, setName,
    email, setEmail,
    phone, setPhone,
    teacherId, setTeacherId,
    qualifications, setQualifications,
    department, setDepartment,
    joiningDate, setJoiningDate,
    assignedClasses, setAssignedClasses,
    assignedSections, setAssignedSections,
    assignedSubjects, setAssignedSubjects,
    classOptions,
    sectionOptions,
    subjectOptions,
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
          {formMode === 'create' ? 'Register Campus Faculty' : 'Edit Faculty Qualifications'}
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
                label="Teacher ID Number"
                fullWidth
                required
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                disabled={formMode === 'edit'}
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
                label="Phone Contact"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Qualifying Degrees / Credentials"
                helperText="e.g. M.Sc in Applied Mathematics, Ph.D in Chemistry"
                fullWidth
                required
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Academic Department"
                fullWidth
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="Mathematics & Science">Mathematics & Science</MenuItem>
                <MenuItem value="Science & Lab Sciences">Science & Lab Sciences</MenuItem>
                <MenuItem value="Humanities & Languages">Humanities & Languages</MenuItem>
                <MenuItem value="Social Sciences & Admin">Social Sciences & Admin</MenuItem>
                <MenuItem value="Computer & Digital Tech">Computer & Digital Tech</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Joining"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={classOptions}
                value={assignedClasses}
                onChange={(_, value) => setAssignedClasses(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned Classes"
                    helperText="Select one or more classes"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={sectionOptions}
                value={assignedSections}
                onChange={(_, value) => setAssignedSections(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned Sections"
                    helperText="Select one or more sections"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={subjectOptions}
                value={assignedSubjects}
                onChange={(_, value) => setAssignedSubjects(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned Subjects"
                    helperText="Select one or more subjects"
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ px: 4, fontWeight: 800 }}>
            {formMode === 'create' ? 'Register Teacher' : 'Save Profiles'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
