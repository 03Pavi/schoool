import React from 'react'
import Box from '@mui/material/Box'
import { AppPageHeader } from '@/shared/ui'
import { BreadcrumbItem } from '@/shared/ui/app-breadcrumb'

export interface PageContainerProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: React.ReactNode
}

export const PageContainer = ({ children, title, subtitle, breadcrumbs, action }: PageContainerProps) => {
  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 2 },
        py: { xs: 1.5, md: 2 },
        maxWidth: '100%',
        mx: 'auto',
        width: '100%',
      }}
    >
      <AppPageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} action={action} />
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Box>
  )
}

export default PageContainer
