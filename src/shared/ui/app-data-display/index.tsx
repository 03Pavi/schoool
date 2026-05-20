'use client'

import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import DesktopTable from './desktop-table'
import MobileCardList from './mobile-card-list'

interface AppDataDisplayProps {
  rows: any[]
  columns: any[]
  renderMobileCard: (row: any) => React.ReactNode
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: any) => void
}

export const AppDataDisplay = ({
  rows,
  columns,
  renderMobileCard,
  loading,
  emptyMessage,
  onRowClick,
}: AppDataDisplayProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return isMobile ? (
    <MobileCardList 
      rows={rows} 
      renderMobileCard={renderMobileCard} 
      loading={loading} 
      emptyMessage={emptyMessage} 
    />
  ) : (
    <DesktopTable 
      rows={rows} 
      columns={columns} 
      loading={loading} 
      emptyMessage={emptyMessage} 
      onRowClick={onRowClick}
    />
  )
}

export default AppDataDisplay
