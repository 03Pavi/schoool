'use client'

import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'

interface AcademicOption {
  id: string
  name: string
}

interface SubjectFormDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  formMode: 'create' | 'edit'
  onSubmit: (e: React.FormEvent) => void
  isSaving: boolean
  fields: {
    subjectName: string
    setSubjectName: (v: string) => void
    subjectCode: string
    setSubjectCode: (v: string) => void
    subjectGradeIds: string[]
    setSubjectGradeIds: (v: string[]) => void
    subjectClassIds: string[]
    setSubjectClassIds: (v: string[]) => void
    subjectTeacherIds: string[]
    setSubjectTeacherIds: (v: string[]) => void
    subjectStatus: 'Active' | 'Inactive'
    setSubjectStatus: (v: 'Active' | 'Inactive') => void
    gradeOptions: AcademicOption[]
    classOptions: AcademicOption[]
    teacherOptions: AcademicOption[]
  }
}

export const SubjectFormDialog: React.FC<SubjectFormDialogProps> = ({
  open,
  onClose,
  isMobile,
  formMode,
  onSubmit,
  fields,
  isSaving,
}) => {
  const {
    subjectName,
    setSubjectName,
    subjectCode,
    setSubjectCode,
    subjectGradeIds,
    setSubjectGradeIds,
    subjectClassIds,
    setSubjectClassIds,
    subjectTeacherIds,
    setSubjectTeacherIds,
    subjectStatus,
    setSubjectStatus,
    gradeOptions,
    classOptions,
    teacherOptions,
  } = fields

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: isMobile ? {} : { borderRadius: 4, p: 1 } }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.35rem' }}>
          {formMode === 'create' ? 'Create Dynamic Subject' : 'Modify Subject Credentials'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subject Name"
                placeholder="e.g. Mathematics, Organic Chemistry"
                fullWidth
                required
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subject Code"
                placeholder="e.g. MATH-101, CHEM-202"
                fullWidth
                required
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                disabled={formMode === 'edit'}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={gradeOptions}
                getOptionLabel={(option) => option.name}
                value={gradeOptions.filter((item) => subjectGradeIds.includes(item.id))}
                onChange={(_, value) => setSubjectGradeIds(value.map((item) => item.id))}
                renderInput={(params) => <TextField {...params} label="Linked Grades" placeholder="Select grades" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={classOptions}
                getOptionLabel={(option) => option.name}
                value={classOptions.filter((item) => subjectClassIds.includes(item.id))}
                onChange={(_, value) => setSubjectClassIds(value.map((item) => item.id))}
                renderInput={(params) => <TextField {...params} label="Linked Classes" placeholder="Select classes" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={teacherOptions}
                getOptionLabel={(option) => option.name}
                value={teacherOptions.filter((item) => subjectTeacherIds.includes(item.id))}
                onChange={(_, value) => setSubjectTeacherIds(value.map((item) => item.id))}
                renderInput={(params) => (
                  <TextField {...params} label="Assigned Teachers" placeholder="Select teachers" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                fullWidth
                required
                value={subjectStatus}
                onChange={(e) => setSubjectStatus(e.target.value as 'Active' | 'Inactive')}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ px: 4, fontWeight: 800 }} disabled={isSaving}>
            {formMode === 'create' ? 'Create Subject' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
