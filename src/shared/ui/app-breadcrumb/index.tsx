import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NextLink from 'next/link'

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface AppBreadcrumbProps {
  items: BreadcrumbItem[]
}

export const AppBreadcrumb = ({ items }: AppBreadcrumbProps) => {
  return (
    <Breadcrumbs 
      separator={<NavigateNextIcon sx={{ fontSize: '0.75rem', opacity: 0.5 }} />} 
      aria-label="breadcrumb"
      sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast || !item.path) {
          return (
            <Typography key={index} color="text.disabled" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {item.label}
            </Typography>
          )
        }

        return (
          <Link
            key={index}
            component={NextLink}
            underline="hover"
            color="text.secondary"
            href={item.path}
            sx={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default AppBreadcrumb
