'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard } from '@/shared/ui'

const initialChats = [
  { id: 1, sender: 'Mrs. Emma Watson', message: 'Hello Admin, has the mathematics scheduling for class 10-A final exams been approved?', time: '10:15 AM', avatar: 'E' },
  { id: 2, sender: 'Admin Profile', message: 'Hi Mrs. Emma, yes! It has been finalized. You should be able to view it under the assessment panel.', time: '10:20 AM', avatar: 'A' },
  { id: 3, sender: 'Mrs. Emma Watson', message: 'Fabulous! I will notify the student rosters immediately. Thank you!', time: '10:22 AM', avatar: 'E' },
]

export default function CommunicationPage() {
  const [messages, setMessages] = useState(initialChats)
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedMessage, setTypedMessage] = useState('')

  // Load messages from localStorage safely on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('communication_messages')
      if (saved) {
        try {
          setMessages(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse communication messages', e)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('communication_messages', JSON.stringify(messages))
    }
  }, [messages, isLoaded])

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return
    const newMsg = {
      id: Math.random(),
      sender: 'Admin Profile',
      message: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'A',
    }
    setMessages((prev) => [...prev, newMsg])
    setTypedMessage('')
  }

  return (
    <DashboardLayout>
      <PageContainer
        title="Internal Communication Portal"
        subtitle="Coordinate parent-teacher consults, issue global announcements, and review messaging logs."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Communication' }]}
      >
        <AppCard title="Live Counselor-Teacher Messaging Console" subheader="Active administrative discussion chat channels.">
          <Box sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
            {/* Messages box list */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                mb: 3, 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 3, 
                bgcolor: (theme) => theme.palette.mode === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' 
              }}
            >
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((chat) => {
                  const isAdmin = chat.sender === 'Admin Profile'
                  return (
                    <ListItem 
                      key={chat.id} 
                      disablePadding 
                      sx={{ display: 'flex', justifyContent: isAdmin ? 'flex-end' : 'flex-start' }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          gap: 1.5, 
                          flexDirection: isAdmin ? 'row-reverse' : 'row', 
                          maxWidth: '70%' 
                        }}
                      >
                        <Avatar sx={{ bgcolor: isAdmin ? 'primary.main' : 'secondary.main', width: 36, height: 36 }}>
                          {chat.avatar}
                        </Avatar>
                        <Box 
                          sx={{ 
                            p: 2, 
                            borderRadius: 3, 
                            bgcolor: isAdmin ? 'primary.main' : 'background.paper', 
                            color: isAdmin ? 'white' : 'text.primary', 
                            border: '1px solid', 
                            borderColor: 'divider', 
                            boxShadow: '0px 2px 8px rgba(0,0,0,0.02)' 
                          }}
                        >
                          <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 0.5 }}>
                            {chat.sender}
                          </Typography>
                          <Typography variant="body2">
                            {chat.message}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color={isAdmin ? 'rgba(255,255,255,0.7)' : 'text.secondary'} 
                            display="block" 
                            align="right" 
                            sx={{ mt: 0.5 }}
                          >
                            {chat.time}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  )
                })}
              </List>
            </Box>

            {/* Message input */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Type your secure response message here..."
                variant="outlined"
                size="small"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage()
                }}
              />
              <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ px: 3 }}>
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </AppCard>
      </PageContainer>
    </DashboardLayout>
  )
}
