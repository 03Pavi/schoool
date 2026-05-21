'use client';

import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { AppCard } from '@/shared/ui'
import { useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'

export const AttendanceChart = () => {
  const theme = useTheme()
  const { data: session } = useSession()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming we have an endpoint for attendance chart data
        // Adjust the endpoint as per your backend
        const res = await fetch(`/api/dashboard/attendance-chart`)
        if (!res.ok) {
          throw new Error('Failed to fetch attendance chart data')
        }
        const result = await res.json()
        setData(result)
      } catch (err) {
        setError(err.message)
        setData([]) // Set to empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    // Return skeleton or loading state
    return (
      <AppCard title="Weekly Attendance Analysis" subheader="Daily attendance percentages vs campus targets">
        <div style={{ width: '100%', height: 300 }}>
          <div className="animate-pulse">Loading attendance data...</div>
        </div>
      </AppCard>
    )
  }

  if (error) {
    return (
      <AppCard title="Weekly Attendance Analysis" subheader="Daily attendance percentages vs campus targets">
        <div style={{ width: '100%', height: 300 }}>
          <div className="text-red-500">Error: {error}</div>
        </div>
      </AppCard>
    )
  }

  // If no data available, show a message
  if (!data || data.length === 0) {
    return (
      <AppCard title="Weekly Attendance Analysis" subheader="Daily attendance percentages vs campus targets">
        <div style={{ width: '100%', height: 300 }}>
          <div>No attendance data available</div>
        </div>
      </AppCard>
    )
  }

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