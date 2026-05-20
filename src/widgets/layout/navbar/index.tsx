'use client'

import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { useAppSelector, useAppDispatch } from '@/shared/hooks'
import { useRouter } from 'next/navigation'
import { toggleSidebar, toggleTheme, logout } from '@/app/store/ui-slice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const themeMode = useAppSelector((state) => state.ui.themeMode)
  const user = useAppSelector((state) => state.ui.auth.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
    router.push('/login')
  }

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="800" noWrap sx={{ display: { xs: 'none', md: 'block' } }}>
            ERP Portal
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme Mode Toggle */}
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            {themeMode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </IconButton>

          {/* Notifications */}
          <IconButton color="inherit">
            <Badge color="error" variant="dot">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* Profile Dropdown */}
          {user && (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 600 }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    boxShadow: '0px 10px 30px rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    minWidth: 180,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" fontWeight="700">
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <MenuItem onClick={handleMenuClose} sx={{ py: 1, gap: 1.5, fontSize: '0.875rem' }}>
                  <PersonIcon fontSize="small" color="action" /> My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: 1, gap: 1.5, color: 'error.main', fontSize: '0.875rem' }}>
                  <LogoutIcon fontSize="small" color="error" /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
