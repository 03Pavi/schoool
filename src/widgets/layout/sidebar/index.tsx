'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAppSelector, useAppDispatch } from '@/shared/hooks'
import { toggleSidebar, uiSlice } from '@/app/store/ui-slice'
import { sidebarItems } from './config'

import { useRbac } from '@/entities/permission'

const DRAWER_WIDTH = 260
const COLLAPSED_DRAWER_WIDTH = 76

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  const [isHydrated, setIsHydrated] = useState(false)
  const dispatch = useAppDispatch()
  const isCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed)
  const { canViewSidebarItem } = useRbac()
  const user = useAppSelector((state) => state.ui.auth.user)

  // Ensure sidebar starts as closed (collapsed) on mobile
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isMobile) {
      dispatch(uiSlice.actions.setSidebarCollapsed(true))
    }
  }, [isMobile, dispatch])

  if (!isHydrated) {
    return null
  }

  const handleListItemClick = (path: string) => {
    router.push(path)
    if (isMobile) {
      dispatch(uiSlice.actions.setSidebarCollapsed(true)) // Close temporary drawer on tap
    }
  }

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: (isCollapsed && !isMobile) ? 'center' : 'space-between',
          px: 2,
          py: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {(!isCollapsed || isMobile) && (
          <Typography variant="h6" fontWeight="800" color="primary.main" letterSpacing="0.5px">
            ERP PORTAL
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={() => dispatch(toggleSidebar())} size="small">
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>

      {/* User info panel */}
      {user && (!isCollapsed || isMobile) && (
        <Box
          sx={{
            p: 2,
            mx: 2,
            my: 2,
            borderRadius: 3,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(255, 255, 255, 0.03)'),
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40, fontWeight: 700 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" fontWeight="700" noWrap>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap display="block" sx={{ textTransform: 'capitalize' }}>
              {user.role} Account
            </Typography>
          </Box>
        </Box>
      )}

      {/* Collapsed simple avatar */}
      {user && (isCollapsed && !isMobile) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, fontSize: '0.875rem', fontWeight: 700 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      )}

      {/* List items */}
      <List sx={{ px: 1.5 }}>
        {sidebarItems
          .filter((item) => canViewSidebarItem(item.path))
          .map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <ListItem key={item.label} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleListItemClick(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: (isCollapsed && !isMobile) ? 'center' : 'initial',
                  px: 2.5,
                  borderRadius: 2,
                  bgcolor: isActive
                    ? (theme) => (theme.palette.mode === 'light' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(56, 189, 248, 0.15)')
                    : 'transparent',
                  color: isActive
                    ? 'primary.main'
                    : 'text.secondary',
                  '&:hover': {
                    bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)'),
                    color: 'text.primary',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: (isCollapsed && !isMobile) ? 'auto' : 2,
                    justifyContent: 'center',
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                {(!isCollapsed || isMobile) && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <>
      {/* Mobile view temporary drawer - CSS-gated to show only on mobile screens */}
      <Drawer
        variant="temporary"
        open={!isCollapsed}
        onClose={() => dispatch(uiSlice.actions.setSidebarCollapsed(true))}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop view permanent drawer - CSS-gated to show only on desktop screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Sidebar
