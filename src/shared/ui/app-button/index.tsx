import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export interface AppButtonProps extends ButtonProps {
  loading?: boolean
}

export const AppButton = ({ children, loading, disabled, startIcon, ...props }: AppButtonProps) => {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...props}
    >
      {children}
    </Button>
  )
}

export default AppButton
