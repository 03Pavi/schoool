'use client';

import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AppCard } from '@/shared/ui'
import { useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'

export const FeeChart = () => {
  const theme = useTheme()
  const { data: session } = useSession()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming we have an endpoint for fee chart data
        // Adjust the endpoint as per your backend
        const res = await fetch(`/api/dashboard/fee-chart`)
        if (!res.ok) {
          throw new Error('Failed to fetch fee chart data')
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
      <AppCard title="Monthly Revenue Overview" subheader="Total tuition fees collected in USD ($)">
        <div style={{ width: '100%', height: 300 }}>
          <div className="animate-pulse">Loading fee data...</div>
        </div>
      </AppCard>
    )
  }

  if (error) {
    return (
      <AppCard title="Monthly Revenue Overview" subheader="Total tuition fees collected in USD ($)">
        <div style={{ width: '100%', height: 300 }}>
          <div className="text-red-500">Error: {error}</div>
        </div>
      </AppCard>
    )
  }

  // If no data available, show a message
  if (!data || data.length === 0) {
    return (
      <AppCard title="Monthly Revenue Overview" subheader="Total tuition fees collected in USD ($)">
        <div style={{ width: '100%', height: 300 }}>
          <div>No fee data available</div>
        </div>
      </AppCard>
    )
  }

  return (
    <AppCard title="Monthly Revenue Overview" subheader="Total tuition fees collected in USD ($)">
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="month" stroke={theme.palette.text.secondary} style={{ fontSize: '12px' }} />
            <YAxis stroke={theme.palette.text.secondary} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                borderRadius: '8px',
                color: theme.palette.text.primary,
              }}
            />
            <Area
              type="monotone"
              dataKey="collected"
              name="Fees Collected ($)"
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#colorCollected)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AppCard>
  )
}

export default FeeChart