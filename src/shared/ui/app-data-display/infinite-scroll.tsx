'use client'

import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

interface InfiniteScrollProps {
  items: any[]
  renderItem: (item: any) => React.ReactNode
  loading?: boolean
  emptyMessage?: string
}

export const InfiniteScroll = ({ items, renderItem, loading, emptyMessage = 'No records found' }: InfiniteScrollProps) => {
  const [visibleCount, setVisibleCount] = useState(10)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisibleCount(10)
  }, [items])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && visibleCount < items.length) {
          setVisibleCount((prev) => Math.min(prev + 10, items.length))
        }
      },
      { threshold: 0.1 }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [visibleCount, items])

  const visibleItems = items.slice(0, visibleCount)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {visibleItems.map((item) => renderItem(item))}
      
      {visibleCount < items.length && (
        <Box 
          ref={loaderRef} 
          sx={{ 
            py: 1.5, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 1
          }}
        >
          <CircularProgress size={14} />
          <Typography variant="caption" color="text.secondary">
            Loading next items...
          </Typography>
        </Box>
      )}

      {items.length === 0 && (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default InfiniteScroll
