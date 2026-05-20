'use client'

import React, { useState, useEffect } from 'react'
import { useRbac } from '@/entities/permission'
import { useAppDispatch } from '@/shared/hooks'
import { uiSlice } from '@/app/store/ui-slice'

export interface Teacher {
  id: string
  teacherId: string
  name: string
  email: string
  phone: string
  qualifications: string
  department: string
  joiningDate: string
  assignedClasses: string[]
  assignedSections: string[]
  assignedSubjects: string[]
  status: 'Active' | 'Archived'
}

export const initialTeachers: Teacher[] = [
  {
    id: '1',
    teacherId: 'TC-0042',
    name: 'Mrs. Emma Watson',
    email: 'emma.w@erp.com',
    phone: '+91 98765 43210',
    qualifications: 'M.Sc in Applied Mathematics',
    department: 'Mathematics & Science',
    joiningDate: '2022-06-15',
    assignedClasses: ['Grade 10-A', 'Grade 9-B'],
    assignedSections: ['A', 'B'],
    assignedSubjects: ['Mathematics', 'Science'],
    status: 'Active'
  },
  {
    id: '2',
    teacherId: 'TC-0043',
    name: 'Mr. Johnathan Clark',
    email: 'clark.j@erp.com',
    phone: '+91 98765 43211',
    qualifications: 'Ph.D in Theoretical Physics',
    department: 'Science & Lab Sciences',
    joiningDate: '2021-08-10',
    assignedClasses: ['Grade 12-B', 'Grade 11-A'],
    assignedSections: ['A', 'B'],
    assignedSubjects: ['Physics', 'Astronomy'],
    status: 'Active'
  },
  {
    id: '3',
    teacherId: 'TC-0044',
    name: 'Mrs. Grace Miller',
    email: 'grace.m@erp.com',
    phone: '+91 98765 43212',
    qualifications: 'M.Sc in Organic Chemistry',
    department: 'Science & Lab Sciences',
    joiningDate: '2023-01-20',
    assignedClasses: ['Grade 11-C', 'Grade 10-B'],
    assignedSections: ['B', 'C'],
    assignedSubjects: ['Chemistry', 'Environmental Studies'],
    status: 'Active'
  },
  {
    id: '4',
    teacherId: 'TC-0045',
    name: 'Mr. Robert Davies',
    email: 'robert.d@erp.com',
    phone: '+91 98765 43213',
    qualifications: 'M.A in English Literature',
    department: 'Humanities & Languages',
    joiningDate: '2020-11-05',
    assignedClasses: ['Grade 9-A'],
    assignedSections: ['A'],
    assignedSubjects: ['English Literature', 'Creative Writing'],
    status: 'Active'
  },
]

export const useTeachers = () => {
  const dispatch = useAppDispatch()
  const { role, user } = useRbac()

  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  // Card Context Menu States
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [activeTeacherMenu, setActiveTeacherMenu] = useState<Teacher | null>(null)

  // Form Fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [department, setDepartment] = useState('')
  const [joiningDate, setJoiningDate] = useState('')
  const [assignedClasses, setAssignedClasses] = useState<string[]>([])
  const [assignedSections, setAssignedSections] = useState<string[]>([])
  const [assignedSubjects, setAssignedSubjects] = useState<string[]>([])

  // Load from localStorage safely on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('teachers_data')
      if (saved) {
        try {
          setTeachers(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse teachers data', e)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage when teachers list changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('teachers_data', JSON.stringify(teachers))
    }
  }, [teachers, isLoaded])

  // Context Menu Handlers
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, teacher: Teacher) => {
    setMenuAnchorEl(event.currentTarget)
    setActiveTeacherMenu(teacher)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
    setActiveTeacherMenu(null)
  }

  const handleOpenCreate = () => {
    setFormMode('create')
    setName('')
    setEmail('')
    setPhone('')
    setTeacherId(`TC-${Math.floor(1000 + Math.random() * 9000)}`)
    setQualifications('')
    setDepartment('Mathematics & Science')
    setJoiningDate(new Date().toISOString().split('T')[0])
    setAssignedClasses([])
    setAssignedSections([])
    setAssignedSubjects([])
    setIsFormOpen(true)
  }

  const handleOpenEdit = (teacher: Teacher) => {
    setFormMode('edit')
    setSelectedTeacher(teacher)
    setName(teacher.name)
    setEmail(teacher.email)
    setPhone(teacher.phone)
    setTeacherId(teacher.teacherId)
    setQualifications(teacher.qualifications)
    setDepartment(teacher.department)
    setJoiningDate(teacher.joiningDate)
    setAssignedClasses(teacher.assignedClasses)
    setAssignedSections(teacher.assignedSections ?? [])
    setAssignedSubjects(teacher.assignedSubjects)
    setIsFormOpen(true)
  }

  const handleOpenDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsDetailsOpen(true)
  }

  const handleDeleteTeacher = (id: string, teacherName: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
    dispatch(
      uiSlice.actions.addNotification({
        message: `Successfully archived faculty member ${teacherName}!`,
        type: 'success',
      })
    )
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    if (formMode === 'create') {
      const newTeacher: Teacher = {
        id: Math.random().toString(),
        teacherId,
        name,
        email,
        phone,
        qualifications,
        department,
        joiningDate,
        assignedClasses,
        assignedSections,
        assignedSubjects,
        status: 'Active',
      }
      setTeachers((prev) => [newTeacher, ...prev])
      dispatch(
        uiSlice.actions.addNotification({
          message: `Successfully registered faculty member ${name}!`,
          type: 'success',
        })
      )
    } else if (formMode === 'edit' && selectedTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === selectedTeacher.id
            ? {
              ...t,
              name,
              email,
              phone,
              qualifications,
              department,
              joiningDate,
              assignedClasses,
              assignedSections,
              assignedSubjects,
            }
            : t
        )
      )
      dispatch(
        uiSlice.actions.addNotification({
          message: `Successfully updated credentials for ${name}!`,
          type: 'success',
        })
      )
    }

    setIsFormOpen(false)
  }

  // Teacher Profile Roster Isolation
  const activeUserEmail = user?.email || 'emma.w@erp.com'
  const filteredTeachers = teachers.filter((teacher) => {
    if (role === 'teacher') {
      return teacher.email.toLowerCase() === activeUserEmail.toLowerCase()
    }
    return (
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return {
    teachers,
    filteredTeachers,
    searchQuery,
    setSearchQuery,
    isFormOpen,
    setIsFormOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    formMode,
    selectedTeacher,
    menuAnchorEl,
    activeTeacherMenu,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetails,
    handleDeleteTeacher,
    handleSubmitForm,
    formFields: {
      name, setName,
      email, setEmail,
      phone, setPhone,
      teacherId, setTeacherId,
      qualifications, setQualifications,
      department, setDepartment,
      joiningDate, setJoiningDate,
      assignedClasses, setAssignedClasses,
      assignedSections, setAssignedSections,
      assignedSubjects, setAssignedSubjects,
      classOptions: ['Grade 12-A', 'Grade 12-B', 'Grade 11-A', 'Grade 11-B', 'Grade 10-A', 'Grade 10-B', 'Grade 9-A', 'Grade 9-B'],
      sectionOptions: ['A', 'B', 'C', 'Lab', 'Activity'],
      subjectOptions: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Astronomy', 'English Literature', 'Creative Writing', 'Computer Science'],
    }
  }
}
