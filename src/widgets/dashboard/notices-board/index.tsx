import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { AppCard } from '@/shared/ui'

const notices = [
  {
    id: 1,
    title: 'Final Examination Schedule',
    date: 'May 24, 2026',
    priority: 'High',
    color: 'error',
    content: 'The end-of-year exams schedule is now officially published. Exams begin June 8, please check portals.',
  },
  {
    id: 2,
    title: 'Sports Day Re-scheduling',
    date: 'May 21, 2026',
    priority: 'Medium',
    color: 'warning',
    content: 'Due to forecasted inclement weather, the track-and-field meet has been deferred to June 1.',
  },
  {
    id: 3,
    title: 'New Library Catalog System',
    date: 'May 18, 2026',
    priority: 'Low',
    color: 'info',
    content: 'The digital catalog terminal is fully operational. Students can reserve books online.',
  },
]

export const NoticesBoard = () => {
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
