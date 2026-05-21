'use client';

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SchoolIcon from '@mui/icons-material/School'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { AppCard } from '@/shared/ui'
import { useRbac, Permission } from '@/entities/permission'
import { useSession } from 'next-auth/react'

interface StatCardProps {
  title: string
  value: string | number
  subtext: string
  icon: React.ReactNode
  iconBg: string
}

const StatCard = ({ title, value, subtext, icon, iconBg }: StatCardProps) => {
  return (
    <AppCard>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            {value}
          </Typography>
          <Typography variant="caption" color="success.main" fontWeight={600} sx={{ mt: 1, display: 'block' }}>
            {subtext}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '12px',
            background: iconBg,
            color: 'white',
          }}
        >
          {icon}
        </Box>
      </Box>
    </AppCard>
  )
}

export const StatsCards = () => {
  const { data: session } = useSession()
  const { hasPermission } = useRbac()
  const role = session?.user?.role?.toLowerCase() // assuming role is in session.user.role
  const [stats, setStats] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!role) {
        setStats([])
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/dashboard/${role}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch dashboard stats for role ${role}`)
        }
        const data = await res.json()
        // Assuming the backend returns an array of stat objects with the same shape as before
        setStats(data)
      } catch (err) {
        setError(err.message)
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [role])

  if (loading) {
    return <div className="animate-pulse">Loading dashboard stats...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading dashboard stats: {error}</div>
  }

  // Filter stats by permission (keeping the original behavior)
  const filteredStats = stats.filter((stat: any) => 
    hasPermission(stat.permission as Permission)
  )

  if (filteredStats.length === 0) return null

  // Calculate layout grid widths dynamically based on number of active metrics
  const mdWidth = Math.max(3, Math.floor(12 / filteredStats.length))

  return (
    <Grid container spacing={2}>
      {filteredStats.map((stat: any, i: number) => (
        <Grid item xs={12} sm={6} md={mdWidth} key={i}>
          <StatCard 
            title={stat.title}
            value={stat.value}
            subtext={stat.subtext}
            icon={stat.icon}
            iconBg={stat.iconBg}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsCards