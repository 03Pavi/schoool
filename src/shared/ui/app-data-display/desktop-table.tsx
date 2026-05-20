'use client'

import React from 'react'
import Box from '@mui/material/Box'
import { AppDataGrid, AppDataGridProps } from '../app-data-grid'

interface DesktopTableProps extends AppDataGridProps {
  onRowClick?: (row: any) => void
}

export const DesktopTable = ({ rows, columns, loading, emptyMessage, onRowClick, ...props }: DesktopTableProps) => {
  return (
    <AppDataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      emptyMessage={emptyMessage}
      onRowClick={onRowClick ? (params) => onRowClick(params.row) : undefined}
      sx={{ cursor: onRowClick ? 'pointer' : 'default', ...props.sx }}
      {...props}
    />
  )
}

export default DesktopTable
