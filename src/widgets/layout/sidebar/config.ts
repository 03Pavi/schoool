import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ChatIcon from '@mui/icons-material/Chat'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import SettingsIcon from '@mui/icons-material/Settings'
import ClassIcon from '@mui/icons-material/Class'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface SidebarItem {
  label: string
  path: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

export const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardIcon,
  },
  {
    label: 'Academic Hub',
    path: '/academic',
    icon: ClassIcon,
  },
  {
    label: 'Students',
    path: '/students',
    icon: PeopleIcon,
  },
  {
    label: 'Teachers',
    path: '/teachers',
    icon: SchoolIcon,
  },
  {
    label: 'Guardians',
    path: '/guardians',
    icon: SupervisorAccountIcon,
  },
  {
    label: 'Attendance',
    path: '/attendance',
    icon: EventAvailableIcon,
  },
  {
    label: 'Fees',
    path: '/fees',
    icon: MonetizationOnIcon,
  },
  {
    label: 'Exams',
    path: '/exams',
    icon: AssessmentIcon,
  },
  {
    label: 'Homework',
    path: '/homework',
    icon: MenuBookIcon,
  },
  {
    label: 'Communication',
    path: '/communication',
    icon: ChatIcon,
  },
  {
    label: 'Library',
    path: '/library',
    icon: LocalLibraryIcon,
  },
  {
    label: 'Transport',
    path: '/transport',
    icon: DirectionsBusIcon,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
  },
]
