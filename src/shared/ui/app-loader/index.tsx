import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export interface AppLoaderProps {
  message?: string
  height?: string | number
}

export const AppLoader = ({ message, height = '200px' }: AppLoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        gap: 2,
      }}
    >
      <CircularProgress size={40} thickness={4} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default AppLoader
