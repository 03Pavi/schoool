import React from 'react'
import Card, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'

export interface AppCardProps extends Omit<CardProps, 'title'> {
  title?: React.ReactNode
  subheader?: React.ReactNode
  action?: React.ReactNode
  noPadding?: boolean
}

export const AppCard = ({ children, title, subheader, action, noPadding, ...props }: AppCardProps) => {
  return (
    <Card {...props}>
      {(title || subheader || action) && (
        <>
          <CardHeader 
            title={title} 
            subheader={subheader} 
            action={action} 
            titleTypographyProps={{ variant: 'h6', fontWeight: 800, fontSize: '0.9375rem' }} 
            subheaderTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
            sx={{ px: 1.5, py: 1.25 }}
          />
          <Divider />
        </>
      )}
      <CardContent 
        sx={
          noPadding 
            ? { p: 0, '&:last-child': { pb: 0 } } 
            : { p: { xs: 1.5, md: 2 }, '&:last-child': { pb: { xs: 1.5, md: 2 } } }
        }
      >
        {children}
      </CardContent>
    </Card>
  )
}

export default AppCard
