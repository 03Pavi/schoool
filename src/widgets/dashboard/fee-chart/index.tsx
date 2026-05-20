'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AppCard } from '@/shared/ui'
import { useTheme } from '@mui/material/styles'

const data = [
  { month: 'Jan', collected: 12000 },
  { month: 'Feb', collected: 19000 },
  { month: 'Mar', collected: 32000 },
  { month: 'Apr', collected: 25000 },
  { month: 'May', collected: 48000 },
]

export const FeeChart = () => {
  const theme = useTheme()

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
