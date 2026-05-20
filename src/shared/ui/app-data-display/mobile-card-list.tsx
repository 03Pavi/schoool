'use client'

import React from 'react'
import Box from '@mui/material/Box'
import { InfiniteScroll } from './infinite-scroll'

interface MobileCardListProps {
  rows: any[]
  renderMobileCard: (row: any) => React.ReactNode
  loading?: boolean
  emptyMessage?: string
}

export const MobileCardList = ({ rows, renderMobileCard, loading, emptyMessage }: MobileCardListProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <InfiniteScroll 
        items={rows} 
        renderItem={renderMobileCard} 
        loading={loading} 
        emptyMessage={emptyMessage} 
      />
    </Box>
  )
}

export default MobileCardList
