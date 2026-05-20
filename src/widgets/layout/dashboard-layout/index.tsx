'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '../sidebar'
import { Navbar } from '../navbar'
import { CommandPalette } from '../command-palette'
import { useRbac } from '@/entities/permission'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { canAccessRoute, role, isAuthenticated } = useRbac()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Omit layout and prevent flicker during redirect
  }

  const isAuthorized = canAccessRoute(pathname || '/')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          {isAuthorized ? (
            children
          ) : (
            <Box 
              sx={{ 
                p: { xs: 2, md: 4 }, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '80vh'
              }}
            >
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4.5, 
                  maxWidth: 500, 
                  width: '100%', 
                  textAlign: 'center', 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    p: 2, 
                    borderRadius: '50%', 
                    bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.15)',
                    color: 'error.main', 
                    mb: 3 
                  }}
                >
                  <LockPersonIcon sx={{ fontSize: 44 }} />
                </Box>
                <Typography variant="h6" fontWeight="800" gutterBottom>
                  Security Clearance Required
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Your account role (<strong>{role}</strong>) does not hold the permissions required to access the route <code>{pathname}</code>.
                </Typography>
                <Button 
                  variant="contained" 
                  href="/"
                  sx={{ py: 1, px: 4, fontWeight: 700, borderRadius: 1.5, textTransform: 'none' }}
                >
                  Return to Dashboard
                </Button>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
      <CommandPalette />
    </Box>
  )
}

export default DashboardLayout
