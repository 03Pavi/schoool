import React from 'react'
import AppLoader from '@/shared/ui/app-loader'

export default function GlobalLoading() {
  return <AppLoader message="Synchronizing campus resources..." height="80vh" />
}
