'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { createStudentSchema, CreateStudentInput } from '../model/schema'
import { useCreateStudentMutation } from '../api/create-student-api'

export const CreateStudentForm = () => {
  const [createStudent, { isLoading, error, isSuccess }] = useCreateStudentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: '',
      email: '',
      rollNumber: '',
    },
  })

  const onSubmit = async (data: CreateStudentInput) => {
    try {
      await createStudent(data).unwrap()
      reset()
    } catch (err) {
      console.error('Failed to create student:', err)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 480,
        mx: 'auto',
        p: 4,
        borderRadius: 4,
        bgcolor: 'background.paper',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="700">
          Create New Student
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the student's details below to enroll them in the ERP platform.
        </Typography>
      </Box>

      {isSuccess && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Student created successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          An error occurred. Please try again.
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        fullWidth
        label="Roll Number"
        variant="outlined"
        error={!!errors.rollNumber}
        helperText={errors.rollNumber?.message}
        {...register('rollNumber')}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
        sx={{
          py: 1.5,
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: '0px 4px 14px rgba(25, 118, 210, 0.3)',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 20px rgba(25, 118, 210, 0.4)',
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enroll Student'}
      </Button>
    </Box>
  )
}
