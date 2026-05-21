import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { AppCard } from '@/shared/ui'
import { useSession } from 'next-auth/react'

export const NoticesBoard = () => {
  const { data: session } = useSession()
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Assuming we have an endpoint for notices
        // Adjust the endpoint as per your backend
        const res = await fetch(`/api/dashboard/notices`)
        if (!res.ok) {
          throw new Error('Failed to fetch notices')
        }
        const result = await res.json()
        setNotices(result)
      } catch (err) {
        setError(err.message)
        setNotices([]) // Set to empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  if (loading) {
    return (
      <AppCard title="Bulletin & Notices" subheader="Official campus announcements and priority notices">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="animate-pulse">Loading notices...</div>
        </Box>
      </AppCard>
    )
  }

  if (error) {
    return (
      <AppCard title="Bulletin & Notices" subheader="Official campus announcements and priority notices">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="text-red-500">Error: {error}</div>
        </Box>
      </AppCard>
    )
  }

  // If no notices available, show a message
  if (!notices || notices.length === 0) {
    return (
      <AppCard title="Bulletin & Notices" subheader="Official campus announcements and priority notices">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div>No notices available</div>
        </Box>
      </AppCard>
    )
  }

  return (
    <AppCard title="Bulletin & Notices" subheader="Official campus announcements and priority notices">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notices.map((note) => (
          <Box 
            key={note.id} 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              borderLeft: '4px solid', 
              borderLeftColor: `${note.color}.main`, 
              bgcolor: (theme) => theme.palette.mode === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.02)' 
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, gap: 1.5 }}>
              <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                {note.title}
              </Typography>
              <Chip 
                label={note.priority} 
                size="small" 
                color={note.color as any} 
                variant="outlined" 
                sx={{ borderRadius: 1.5, fontWeight: 700 }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {note.content}
            </Typography>
            <Typography variant="caption" color="text.disabled" fontWeight={600}>
              Posted: {note.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </AppCard>
  )
}

export default NoticesBoard