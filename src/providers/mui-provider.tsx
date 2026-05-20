'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '@/shared/theme'
import { useAppSelector } from '@/shared/hooks'

type Props = {
  children: React.ReactNode
}

export const MuiProvider = ({ children }: Props) => {
  const themeMode = useAppSelector((state) => state.ui.themeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
export default MuiProvider
