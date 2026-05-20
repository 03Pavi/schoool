import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SchoolIcon from '@mui/icons-material/School'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { AppCard } from '@/shared/ui'
import { useRbac, Permission } from '@/entities/permission'

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
  const { hasPermission } = useRbac()

  const stats = [
    {
      title: 'Total Students',
      value: '1,240',
      subtext: '+4.5% vs last term',
      icon: <PeopleAltIcon fontSize="medium" />,
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      permission: 'student:view' as Permission,
    },
    {
      title: 'Active Teachers',
      value: '84',
      subtext: '100% active status',
      icon: <SchoolIcon fontSize="medium" />,
      iconBg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      permission: 'student:view' as Permission,
    },
    {
      title: 'Today Attendance',
      value: '94.2%',
      subtext: '+1.2% vs yesterday',
      icon: <HowToRegIcon fontSize="medium" />,
      iconBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      permission: 'attendance:view' as Permission,
    },
    {
      title: 'Fees Collected',
      value: '$48,250',
      subtext: '82% of monthly target',
      icon: <AttachMoneyIcon fontSize="medium" />,
      iconBg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      permission: 'fees:view' as Permission,
    },
  ].filter((stat) => hasPermission(stat.permission))

  if (stats.length === 0) return null

  // Calculate layout grid widths dynamically based on number of active metrics
  const mdWidth = Math.max(3, Math.floor(12 / stats.length))

  return (
    <Grid container spacing={2}>
      {stats.map((stat, i) => (
        <Grid item xs={12} sm={6} md={mdWidth} key={i}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsCards
