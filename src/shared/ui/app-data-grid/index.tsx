import React from 'react'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppLoader from '../app-loader'

export interface AppDataGridProps extends Omit<DataGridProps, 'loading'> {
  loading?: boolean
  emptyMessage?: string
}

export const AppDataGrid = ({ columns, rows, loading, emptyMessage = 'No records found', ...props }: AppDataGridProps) => {
  return (
    <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{
          loadingOverlay: () => <AppLoader message="Loading grid items..." height="100%" />,
          noRowsOverlay: () => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            </Box>
          ),
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b'),
            color: 'text.primary',
            fontWeight: 600,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#f1f5f9' : '#1e293b'),
          },
          ...props.sx,
        }}
        {...props}
      />
    </Box>
  )
}

export default AppDataGrid
