'use client';

import React, { useEffect, useState } from 'react'
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
import { useSession } from 'next-auth/react'

export const ActivityFeed = () => {
  const { data: session } = useSession()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Assuming we have an endpoint for activity feed
        // Adjust the endpoint as per your backend
        const res = await fetch(`/api/dashboard/activity-feed`)
        if (!res.ok) {
          throw new Error('Failed to fetch activity feed')
        }
        const result = await res.json()
        setActivities(result)
      } catch (err) {
        setError(err.message)
        setActivities([]) // Set to empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <AppCard title="Campus Activity Stream" subheader="Real-time log of events, fees and assignments">
        <List sx={{ width: '100%', p: 0 }}>
          <ListItem>
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar sx={{ bgcolor: '#3b82f6', color: 'white', width: 36, height: 36 }}>
                <AssignmentIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
              primary={
                <Typography variant="subtitle2" fontWeight="700">
                  Loading activities...
                </Typography>
              }
            />
          </ListItem>
        </List>
      </AppCard>
    )
  }

  if (error) {
    return (
      <AppCard title="Campus Activity Stream" subheader="Real-time log of events, fees and assignments">
        <List sx={{ width: '100%', p: 0 }}>
          <ListItem>
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar sx={{ bgcolor: '#ef4444', color: 'white', width: 36, height: 36 }}>
                <AssignmentIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
              primary={
                <Typography variant="subtitle2" fontWeight="700">
                  Error loading activities
                </Typography>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
                    {error}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        </List>
      </AppCard>
    )
  }

  // If no activities available, show a message
  if (!activities || activities.length === 0) {
    return (
      <AppCard title="Campus Activity Stream" subheader="Real-time log of events, fees and assignments">
        <List sx={{ width: '100%', p: 0 }}>
          <ListItem>
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar sx={{ bgcolor: '#6b7280', color: 'white', width: 36, height: 36 }}>
                <AssignmentIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
              primary={
                <Typography variant="subtitle2" fontWeight="700">
                  No recent activities
                </Typography>
              }
            />
          </ListItem>
        </List>
      </AppCard>
    )
  }

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