'use client'

import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CampaignIcon from '@mui/icons-material/Campaign'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { AppCard } from '@/shared/ui'

const activities = [
  {
    id: 1,
    title: 'Homework Assigned',
    description: 'Mrs. Emma posted a new Mathematics assignment for Grade 9A.',
    time: '2 hours ago',
    icon: <AssignmentIcon fontSize="small" />,
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Notice Board Update',
    description: 'Campus closed on Friday for Teacher Training seminars.',
    time: '4 hours ago',
    icon: <CampaignIcon fontSize="small" />,
    color: '#f59e0b',
  },
  {
    id: 3,
    title: 'Fee Paid',
    description: 'Grace Miller paid Term 2 tuition fees ($2,400).',
    time: '6 hours ago',
    icon: <PaymentIcon fontSize="small" />,
    color: '#10b981',
  },
  {
    id: 4,
    title: 'New Student Admission',
    description: 'James Clark enrolled in Class 10B enrollment registry.',
    time: '1 day ago',
    icon: <PersonAddIcon fontSize="small" />,
    color: '#ec4899',
  },
]

export const ActivityFeed = () => {
  return (
    <AppCard title="Campus Activity Stream" subheader="Real-time log of events, fees and assignments">
      <List sx={{ width: '100%', p: 0 }}>
        {activities.map((act) => (
          <ListItem 
            key={act.id} 
            alignItems="flex-start" 
            sx={{ 
              px: 0, 
              py: 1.5, 
              borderBottom: '1px solid', 
              borderColor: 'divider', 
              '&:last-child': { borderBottom: 'none' } 
            }}
          >
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar sx={{ bgcolor: act.color, color: 'white', width: 36, height: 36 }}>
                {act.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
              primary={
                <Typography variant="subtitle2" fontWeight="700">
                  {act.title}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
                    {act.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" component="span" sx={{ mt: 0.5, display: 'block' }}>
                    {act.time}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </AppCard>
  )
}

export default ActivityFeed
