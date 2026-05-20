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

interface GradeFormDialogProps {
  open: boolean
  onClose: () => void
  isMobile: boolean
  formMode: 'create' | 'edit'
  onSubmit: (e: React.FormEvent) => void
  isSaving: boolean
  fields: {
    gradeName: string
    setGradeName: (v: string) => void
    gradeClassIds: string[]
    setGradeClassIds: (v: string[]) => void
    gradeSectionIds: string[]
    setGradeSectionIds: (v: string[]) => void
    gradeSubjectIds: string[]
    setGradeSubjectIds: (v: string[]) => void
    gradeStatus: 'Active' | 'Inactive'
    setGradeStatus: (v: 'Active' | 'Inactive') => void
    classOptions: AcademicOption[]
    sectionOptions: AcademicOption[]
    subjectOptions: AcademicOption[]
  }
}

export const GradeFormDialog: React.FC<GradeFormDialogProps> = ({
  open,
  onClose,
  isMobile,
  formMode,
  onSubmit,
  fields,
  isSaving,
}) => {
  const {
    gradeName,
    setGradeName,
    gradeClassIds,
    setGradeClassIds,
    gradeSectionIds,
    setGradeSectionIds,
    gradeSubjectIds,
    setGradeSubjectIds,
    gradeStatus,
    setGradeStatus,
    classOptions,
    sectionOptions,
    subjectOptions,
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
          {formMode === 'create' ? 'Create Dynamic Grade' : 'Modify Grade Credentials'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Grade Name"
                placeholder="e.g. Grade 10, Nursery, Grade 1"
                fullWidth
                required
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={classOptions}
                getOptionLabel={(option) => option.name}
                value={classOptions.filter((item) => gradeClassIds.includes(item.id))}
                onChange={(_, value) => setGradeClassIds(value.map((item) => item.id))}
                renderInput={(params) => <TextField {...params} label="Linked Classes" placeholder="Select classes" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={sectionOptions}
                getOptionLabel={(option) => option.name}
                value={sectionOptions.filter((item) => gradeSectionIds.includes(item.id))}
                onChange={(_, value) => setGradeSectionIds(value.map((item) => item.id))}
                renderInput={(params) => <TextField {...params} label="Linked Sections" placeholder="Select sections" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={subjectOptions}
                getOptionLabel={(option) => option.name}
                value={subjectOptions.filter((item) => gradeSubjectIds.includes(item.id))}
                onChange={(_, value) => setGradeSubjectIds(value.map((item) => item.id))}
                renderInput={(params) => <TextField {...params} label="Linked Subjects" placeholder="Select subjects" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                fullWidth
                required
                value={gradeStatus}
                onChange={(e) => setGradeStatus(e.target.value as 'Active' | 'Inactive')}
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
            {formMode === 'create' ? 'Create Grade' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
