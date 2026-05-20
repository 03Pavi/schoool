import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AppBreadcrumb, BreadcrumbItem } from '../app-breadcrumb'

export interface AppPageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: React.ReactNode
}

export const AppPageHeader = ({ title, subtitle, breadcrumbs, action }: AppPageHeaderProps) => {
  return (
    <Box sx={{ mb: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {breadcrumbs && <AppBreadcrumb items={breadcrumbs} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" fontWeight={800} color="text.primary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: 'block' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
    </Box>
  )
}

export default AppPageHeader
