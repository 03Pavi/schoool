import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { Student } from '../types'

interface StudentCardProps {
  student: Student
  onClick?: () => void
}

export const StudentCard = ({ student, onClick }: StudentCardProps) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
        } : {},
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          {student.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.email}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Roll No: {student.rollNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
