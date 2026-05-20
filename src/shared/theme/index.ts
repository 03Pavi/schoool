import { createTheme } from '@mui/material/styles'
import { colors } from './colors'
import { typography } from './typography'
import { shadows } from './shadows'
import { breakpoints } from './breakpoints'

export const getTheme = (mode: 'light' | 'dark') => {
  const palette = colors[mode]

  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography,
    shadows,
    breakpoints,
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 700,
            padding: '4px 10px',
            fontSize: '0.75rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            backgroundImage: 'none',
            boxShadow: mode === 'light' 
              ? '0px 1px 2px 0px rgba(0, 0, 0, 0.04)' 
              : '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
            border: '1px solid',
            borderColor: mode === 'light' ? '#e2e8f0' : '#1e293b',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '12px',
            '&:last-child': {
              paddingBottom: '12px',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
          variant: 'outlined',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontSize: '0.8125rem',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 6,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#0f172a',
            color: mode === 'light' ? '#0f172a' : '#f8fafc',
            borderBottom: '1px solid',
            borderColor: mode === 'light' ? '#e2e8f0' : '#1e293b',
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#0f172a',
            borderRight: '1px solid',
            borderColor: mode === 'light' ? '#e2e8f0' : '#1e293b',
          },
        },
      },
    },
  })
}
