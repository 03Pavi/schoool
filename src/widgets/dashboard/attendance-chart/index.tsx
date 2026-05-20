'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { AppCard } from '@/shared/ui'
import { useTheme } from '@mui/material/styles'

const data = [
  { name: 'Mon', attendance: 92, target: 95 },
  { name: 'Tue', attendance: 94, target: 95 },
  { name: 'Wed', attendance: 96, target: 95 },
  { name: 'Thu', attendance: 93, target: 95 },
  { name: 'Fri', attendance: 95, target: 95 },
]

export const AttendanceChart = () => {
  const theme = useTheme()

  return (
    <AppCard title="Weekly Attendance Analysis" subheader="Daily attendance percentages vs campus targets">
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} style={{ fontSize: '12px' }} />
            <YAxis stroke={theme.palette.text.secondary} domain={[80, 100]} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                borderRadius: '8px',
                color: theme.palette.text.primary,
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
            <Bar 
              dataKey="attendance" 
              name="Present %" 
              fill={theme.palette.primary.main} 
              radius={[4, 4, 0, 0]} 
              barSize={28} 
            />
            <Bar 
              dataKey="target" 
              name="Target %" 
              fill={theme.palette.secondary.main} 
              radius={[4, 4, 0, 0]} 
              barSize={28} 
              opacity={0.6} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppCard>
  )
}

export default AttendanceChart
