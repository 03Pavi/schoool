import type { Metadata } from 'next'
import { Providers } from './providers'
import { MuiProvider } from '@/providers/mui-provider'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Scalable ERP Portal',
  description: 'Enterprise Resource Planning system built on high-fidelity scalable architecture.',
  icons: {
    icon: '/favicon.ico',
  },
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <MuiProvider>{children}</MuiProvider>
        </Providers>
      </body>
    </html>
  )
}
