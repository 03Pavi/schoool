'use client'

import React, { useState, useEffect } from 'react'
import { useRbac } from '@/entities/permission'
import { useAppDispatch } from '@/shared/hooks'
import { uiSlice } from '@/app/store/ui-slice'
import { Guardian } from '@/shared/mock/guardians.mock'
import { guardianApi } from '@/entities/guardian/api/guardian-api'
import { studentDirectoryMockResponse } from '@/shared/mock/students.mock'

export const useGuardians = () => {
  const dispatch = useAppDispatch()
  const { role, user } = useRbac()

  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const students = studentDirectoryMockResponse.data ?? []

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [selectedGuardian, setSelectedGuardian] = useState<Guardian | null>(null)

  // Card Context Menu States
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [activeGuardianMenu, setActiveGuardianMenu] = useState<Guardian | null>(null)

  // Form Fields
  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [phone, setPhone] = useState('')
  const [altPhone, setAltPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [linkedRolls, setLinkedRolls] = useState<string[]>([])

  const loadGuardians = async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const response = await guardianApi.getGuardians()
      setGuardians(response.data ?? [])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load guardians')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGuardians()
  }, [])

  // Context Menu Handlers
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, guardian: Guardian) => {
    setMenuAnchorEl(event.currentTarget)
    setActiveGuardianMenu(guardian)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
    setActiveGuardianMenu(null)
  }

  const handleOpenCreate = () => {
    setFormMode('create')
    setName('')
    setRelation('Father')
    setPhone('')
    setAltPhone('')
    setEmail('')
    setAddress('')
    setLinkedRolls([])
    setIsFormOpen(true)
  }

  const handleOpenEdit = (guardian: Guardian) => {
    setFormMode('edit')
    setSelectedGuardian(guardian)
    setName(guardian.name)
    setRelation(guardian.relation)
    setPhone(guardian.phone)
    setAltPhone(guardian.altPhone)
    setEmail(guardian.email)
    setAddress(guardian.address)
    setLinkedRolls(guardian.linkedStudentRolls)
    setIsFormOpen(true)
  }

  const handleOpenDetails = (guardian: Guardian) => {
    setSelectedGuardian(guardian)
    setIsDetailsOpen(true)
  }

  const handleDeleteGuardian = (id: string, name: string) => {
    setGuardians((prev) => prev.filter((g) => g.id !== id))
    dispatch(
      uiSlice.actions.addNotification({
        message: `Successfully removed guardian relationship for ${name}!`,
        type: 'success',
      })
    )
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    if (formMode === 'create') {
      const newGuardian: Guardian = {
        id: Math.random().toString(),
        name,
        relation,
        phone,
        altPhone,
        email,
        address,
        linkedStudentRolls: linkedRolls,
      }
      setGuardians((prev) => [newGuardian, ...prev])
      dispatch(
        uiSlice.actions.addNotification({
          message: `Successfully registered guardian ${name}!`,
          type: 'success',
        })
      )
    } else if (formMode === 'edit' && selectedGuardian) {
      setGuardians((prev) =>
        prev.map((g) =>
          g.id === selectedGuardian.id
            ? {
              ...g,
              name,
              relation,
              phone,
              altPhone,
              email,
              address,
              linkedStudentRolls: linkedRolls,
            }
            : g
        )
      )
      dispatch(
        uiSlice.actions.addNotification({
          message: `Successfully updated credentials for guardian ${name}!`,
          type: 'success',
        })
      )
    }

    setIsFormOpen(false)
  }

  // Parent Role Isolation: access only linked children
  const isParentViewOnly = role === 'parent'
  const parentEmail = user?.email || 'david.miller@parent.com'

  const filteredGuardians = guardians.filter((guardian) => {
    if (isParentViewOnly) {
      return guardian.email.toLowerCase() === parentEmail.toLowerCase()
    }
    return (
      guardian.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guardian.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guardian.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guardian.relation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return {
    guardians,
    students,
    filteredGuardians,
    isLoading,
    errorMessage,
    loadGuardians,
    searchQuery,
    setSearchQuery,
    isFormOpen,
    setIsFormOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    formMode,
    selectedGuardian,
    menuAnchorEl,
    activeGuardianMenu,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetails,
    handleDeleteGuardian,
    handleSubmitForm,
    formFields: {
      name, setName,
      relation, setRelation,
      phone, setPhone,
      altPhone, setAltPhone,
      email, setEmail,
      address, setAddress,
      linkedRolls, setLinkedRolls,
    }
  }
}
