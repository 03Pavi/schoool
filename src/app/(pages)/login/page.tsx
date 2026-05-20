'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import Alert from '@mui/material/Alert'
import { useAppDispatch } from '@/shared/hooks'
import { uiSlice } from '@/app/store/ui-slice'
import { FormInput, FormSelect, FormSubmitButton } from '@/shared/ui'

const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['super-admin', 'principal', 'teacher', 'student', 'parent', 'accountant', 'librarian']),
})

type AuthInput = z.infer<typeof authSchema>

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin')

  const formMethods = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: '',
      email: 'pavitar@erp.com',
      password: 'password123',
      role: 'super-admin',
    },
  })

  const onSubmit = async (data: AuthInput) => {
    setErrorMsg('')
    if (activeTab === 'register' && !data.name) {
      setErrorMsg('Full Name is required for registration')
      return
    }

    // Simulate auth check
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        dispatch(
          uiSlice.actions.setThemeMode('light') // Default clean start
        )
        dispatch(
          uiSlice.actions.setPermissions([data.role])
        )
        
        const nameSeed = activeTab === 'register' && data.name ? data.name : data.email.split('@')[0]
        const formattedName = nameSeed.charAt(0).toUpperCase() + nameSeed.slice(1)
        
        dispatch(
          uiSlice.actions.addNotification({
            message: activeTab === 'register' 
              ? `Account registered successfully! Welcome ${formattedName}!`
              : `Welcome back, ${formattedName}!`,
            type: 'success',
          })
        )
        
        // Dispatch credentials
        const user = {
          name: formattedName,
          email: data.email,
          role: data.role,
        }
        
        dispatch(
          uiSlice.actions.loginSuccess(user)
        )
        
        router.push('/')
        resolve()
      }, 1000)
    })
  }

  const handleGoogleSignIn = () => {
    const chosenRole = formMethods.getValues('role')
    
    dispatch(
      uiSlice.actions.addNotification({
        message: 'Connecting to Google Authentication Services...',
        type: 'info',
      })
    )
    
    setTimeout(() => {
      dispatch(uiSlice.actions.setThemeMode('light'))
      dispatch(uiSlice.actions.setPermissions([chosenRole]))
      
      const user = {
        name: 'Google User',
        email: 'user@gmail.com',
        role: chosenRole,
      }
      
      dispatch(
        uiSlice.actions.addNotification({
          message: `Successfully authenticated via Google SSO as Campus ${chosenRole.replace('-', ' ')}!`,
          type: 'success',
        })
      )
      
      dispatch(uiSlice.actions.loginSuccess(user))
      router.push('/')
    }, 1200)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '120vw',
          height: '120vh',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          py: 4,
          px: 4.5,
          width: '100%',
          maxWidth: 460,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.05)',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
              mb: 2,
              boxShadow: '0px 8px 16px rgba(15, 23, 42, 0.2)',
            }}
          >
            <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
          </Avatar>
          <Typography variant="h5" fontWeight="800" letterSpacing="-0.5px" gutterBottom>
            ERP Command Portal
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {activeTab === 'signin' 
              ? 'Sign in to access your administrative academic dashboard.'
              : 'Register a new profile in the campus catalog.'}
          </Typography>
        </Box>

        {/* Tab Toggle Switch */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, val) => {
              setActiveTab(val)
              setErrorMsg('')
            }} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Sign In" value="signin" sx={{ fontWeight: 700, textTransform: 'none' }} />
            <Tab label="Create Account" value="register" sx={{ fontWeight: 700, textTransform: 'none' }} />
          </Tabs>
        </Box>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <FormProvider {...formMethods}>
          <Box component="form" onSubmit={formMethods.handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            
            {activeTab === 'register' && (
              <FormInput
                name="name"
                label="Full Name"
                placeholder="e.g. Pavitar Singh"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <FormSelect
              name="role"
              label="Access Role"
              options={[
                { value: 'super-admin', label: 'Super Administrator' },
                { value: 'principal', label: 'School Principal' },
                { value: 'teacher', label: 'Academic Faculty / Teacher' },
                { value: 'student', label: 'Student Portal' },
                { value: 'parent', label: 'Parent Portal' },
                { value: 'accountant', label: 'Finance Accountant' },
                { value: 'librarian', label: 'Library Curator' },
              ]}
            />

            <FormInput
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <FormInput
              name="password"
              label="Security Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormSubmitButton fullWidth size="large" sx={{ py: 1.25, mt: 1, fontWeight: 700, borderRadius: 1.5, textTransform: 'none' }}>
              {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
            </FormSubmitButton>
          </Box>
        </FormProvider>

        {/* Third-Party Authentication Providers */}
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}>
            <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'divider' }} />
            <Typography variant="caption" color="text.secondary" sx={{ mx: 2, fontWeight: 600 }}>
              OR CONTINUE WITH
            </Typography>
            <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'divider' }} />
          </Box>

          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={handleGoogleSignIn}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
            }
            sx={{
              py: 1.25,
              fontWeight: 600,
              borderRadius: 1.5,
              borderColor: 'divider',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'action.hover',
                borderColor: 'text.primary',
              },
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
