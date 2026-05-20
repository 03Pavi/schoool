'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import SettingsIcon from '@mui/icons-material/Settings'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAppDispatch } from '@/shared/hooks'
import { toggleTheme, addNotification } from '@/app/store/ui-slice'

export const CommandPalette = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Intercepts browser Back button press to dismiss the palette instead of page navigation
  useEffect(() => {
    if (open) {
      window.history.pushState({ dialogueOpen: 'command-palette' }, '')

      const handlePopState = () => {
        setOpen(false)
      }

      window.addEventListener('popstate', handlePopState)
      return () => {
        window.removeEventListener('popstate', handlePopState)
        if (window.history.state?.dialogueOpen === 'command-palette') {
          window.history.back()
        }
      }
    }
  }, [open])

  const actions = [
    {
      label: 'Go to Dashboard Home',
      icon: <DashboardIcon fontSize="small" />,
      action: () => router.push('/'),
      category: 'Navigation',
    },
    {
      label: 'Go to Student admissions registry',
      icon: <PeopleIcon fontSize="small" />,
      action: () => router.push('/students'),
      category: 'Navigation',
    },
    {
      label: 'Go to Attendance sheet roster',
      icon: <HowToRegIcon fontSize="small" />,
      action: () => router.push('/attendance'),
      category: 'Navigation',
    },
    {
      label: 'Go to Role Permission settings',
      icon: <SettingsIcon fontSize="small" />,
      action: () => router.push('/settings'),
      category: 'Navigation',
    },
    {
      label: 'Toggle Dark / Light Theme Mode',
      icon: <Brightness4Icon fontSize="small" />,
      action: () => dispatch(toggleTheme()),
      category: 'Utility Actions',
    },
    {
      label: 'Trigger Quick Help Notification',
      icon: <AddIcon fontSize="small" />,
      action: () =>
        dispatch(
          addNotification({
            message: 'Help tip: Press Ctrl+K from any page to invoke swift command execution!',
            type: 'info',
          })
        ),
      category: 'Utility Actions',
    },
  ]

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(search.toLowerCase()) ||
    act.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleActionClick = (act: typeof actions[0]) => {
    act.action()
    setOpen(false)
    setSearch('')
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: isMobile ? {} : {
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0px 24px 64px rgba(0, 0, 0, 0.15)',
          border: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        {isMobile && (
          <IconButton onClick={() => setOpen(false)} edge="start" color="inherit" aria-label="close" sx={{ mr: 0.5 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <SearchIcon color="action" />
        <InputBase
          fullWidth
          autoFocus
          placeholder="Type a command or search sections (e.g. 'students', 'theme')..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ fontSize: '1rem', fontWeight: 500 }}
        />
        <Chip label="ESC" size="small" variant="outlined" sx={{ borderRadius: 1.5, fontSize: '0.675rem', fontWeight: 700 }} />
      </Box>

      <Box sx={{ maxHeight: 350, overflowY: 'auto', p: 1.5 }}>
        {filtered.length > 0 ? (
          filtered.map((act, i) => (
            <Box
              key={i}
              onClick={() => handleActionClick(act)}
              sx={{
                p: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'light' ? '#f1f5f9' : '#1e293b',
                  color: 'primary.main',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', color: 'text.secondary' }}>
                  {act.icon}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="700">
                    {act.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {act.category}
                  </Typography>
                </Box>
              </Box>
              <KeyboardReturnIcon fontSize="small" sx={{ opacity: 0.5 }} />
            </Box>
          ))
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No actions matching "{search}" found.
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ px: 2, py: 1.5, bgcolor: (theme) => theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a', borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          School ERP Terminal Interface
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Press <kbd style={{ padding: '2px 4px', border: '1px solid', borderRadius: '4px', background: '#e2e8f0', color: 'black' }}>Ctrl</kbd> + <kbd style={{ padding: '2px 4px', border: '1px solid', borderRadius: '4px', background: '#e2e8f0', color: 'black' }}>K</kbd> to toggle
        </Typography>
      </Box>
    </Dialog>
  )
}

export default CommandPalette
