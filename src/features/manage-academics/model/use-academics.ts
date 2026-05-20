'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRbac } from '@/entities/permission'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { uiSlice } from '@/app/store/ui-slice'
import { academicSlice } from '@/features/manage-academics/model/academic-slice'
import { normalizeGradeRows, normalizeMetadata, normalizeSubjectRows } from '@/features/manage-academics/model/normalizers'
import {
  AcademicOption,
  useCreateGradeMutation,
  useCreateSubjectMutation,
  useDeleteGradeMutation,
  useDeleteSubjectMutation,
  useGetAcademicMetadataQuery,
  useGetGradesQuery,
  useGetSubjectsQuery,
  useUpdateGradeMutation,
  useUpdateSubjectMutation,
} from '@/features/manage-academics/api/academic-api'

export interface Grade {
  id: string
  name: string
  classes: string[]
  sections: string[]
  subjects: string[]
  status: 'Active' | 'Inactive'
}

export interface Subject {
  id: string
  name: string
  code: string
  grades: string[]
  classes: string[]
  assignedTeachers: string[]
  status: 'Active' | 'Inactive'
}

const toStatus = (value: 'ACTIVE' | 'INACTIVE'): 'Active' | 'Inactive' =>
  value === 'ACTIVE' ? 'Active' : 'Inactive'

const fromStatus = (value: 'Active' | 'Inactive'): 'ACTIVE' | 'INACTIVE' =>
  value === 'Active' ? 'ACTIVE' : 'INACTIVE'

export const useAcademics = () => {
  const dispatch = useAppDispatch()
  const { role } = useRbac()

  const { data: gradeRowsRaw, isLoading: isGradesLoading } = useGetGradesQuery()
  const { data: subjectRowsRaw, isLoading: isSubjectsLoading } = useGetSubjectsQuery()
  const { data: metadataRaw } = useGetAcademicMetadataQuery()

  const gradeRows = useAppSelector((state) => state.academic.grades)
  const subjectRows = useAppSelector((state) => state.academic.subjects)
  const metadata = useAppSelector((state) => state.academic.metadata)

  const [createGrade, { isLoading: isCreatingGrade }] = useCreateGradeMutation()
  const [updateGrade, { isLoading: isUpdatingGrade }] = useUpdateGradeMutation()
  const [deleteGradeMutation] = useDeleteGradeMutation()
  const [createSubject, { isLoading: isCreatingSubject }] = useCreateSubjectMutation()
  const [updateSubject, { isLoading: isUpdatingSubject }] = useUpdateSubjectMutation()
  const [deleteSubjectMutation] = useDeleteSubjectMutation()

  const [searchGradeQuery, setSearchGradeQuery] = useState('')
  const [searchSubjectQuery, setSearchSubjectQuery] = useState('')

  const [isGradeFormOpen, setIsGradeFormOpen] = useState(false)
  const [isSubjectFormOpen, setIsSubjectFormOpen] = useState(false)

  const [gradeFormMode, setGradeFormMode] = useState<'create' | 'edit'>('create')
  const [subjectFormMode, setSubjectFormMode] = useState<'create' | 'edit'>('create')

  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const [gradeMenuAnchor, setGradeMenuAnchor] = useState<null | HTMLElement>(null)
  const [activeGradeMenu, setActiveGradeMenu] = useState<Grade | null>(null)

  const [subjectMenuAnchor, setSubjectMenuAnchor] = useState<null | HTMLElement>(null)
  const [activeSubjectMenu, setActiveSubjectMenu] = useState<Subject | null>(null)

  const [gradeName, setGradeName] = useState('')
  const [gradeClassIds, setGradeClassIds] = useState<string[]>([])
  const [gradeSectionIds, setGradeSectionIds] = useState<string[]>([])
  const [gradeSubjectIds, setGradeSubjectIds] = useState<string[]>([])
  const [gradeStatus, setGradeStatus] = useState<'Active' | 'Inactive'>('Active')

  const [subjectName, setSubjectName] = useState('')
  const [subjectCode, setSubjectCode] = useState('')
  const [subjectGradeIds, setSubjectGradeIds] = useState<string[]>([])
  const [subjectClassIds, setSubjectClassIds] = useState<string[]>([])
  const [subjectTeacherIds, setSubjectTeacherIds] = useState<string[]>([])
  const [subjectStatus, setSubjectStatus] = useState<'Active' | 'Inactive'>('Active')

  useEffect(() => {
    dispatch(academicSlice.actions.setGrades(normalizeGradeRows(gradeRowsRaw)))
  }, [dispatch, gradeRowsRaw])

  useEffect(() => {
    dispatch(academicSlice.actions.setSubjects(normalizeSubjectRows(subjectRowsRaw)))
  }, [dispatch, subjectRowsRaw])

  useEffect(() => {
    dispatch(academicSlice.actions.setMetadata(normalizeMetadata(metadataRaw)))
  }, [dispatch, metadataRaw])

  const grades: Grade[] = useMemo(
    () =>
      gradeRows.map((g) => ({
        id: g.id,
        name: g.name,
        classes: g.classes.map((item) => item.name),
        sections: Array.from(new Set(g.sections.map((item) => item.name))),
        subjects: g.subjects.map((item) => item.name),
        status: toStatus(g.status),
      })),
    [gradeRows]
  )

  const subjects: Subject[] = useMemo(
    () =>
      subjectRows.map((s) => ({
        id: s.id,
        name: s.name,
        code: s.code,
        grades: s.grades.map((item) => item.name),
        classes: s.classes.map((item) => item.name),
        assignedTeachers: s.assignedTeachers.map((item) => item.name),
        status: toStatus(s.status),
      })),
    [subjectRows]
  )

  const filteredGrades = grades.filter(
    (g) =>
      g.name.toLowerCase().includes(searchGradeQuery.toLowerCase()) ||
      g.classes.join(' ').toLowerCase().includes(searchGradeQuery.toLowerCase()) ||
      g.sections.join(' ').toLowerCase().includes(searchGradeQuery.toLowerCase()) ||
      g.subjects.join(' ').toLowerCase().includes(searchGradeQuery.toLowerCase())
  )

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchSubjectQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchSubjectQuery.toLowerCase()) ||
      s.grades.join(' ').toLowerCase().includes(searchSubjectQuery.toLowerCase()) ||
      s.classes.join(' ').toLowerCase().includes(searchSubjectQuery.toLowerCase()) ||
      s.assignedTeachers.join(' ').toLowerCase().includes(searchSubjectQuery.toLowerCase())
  )

  const handleOpenGradeMenu = (event: React.MouseEvent<HTMLButtonElement>, item: Grade) => {
    setGradeMenuAnchor(event.currentTarget)
    setActiveGradeMenu(item)
  }

  const handleCloseGradeMenu = () => {
    setGradeMenuAnchor(null)
    setActiveGradeMenu(null)
  }

  const handleOpenSubjectMenu = (event: React.MouseEvent<HTMLButtonElement>, item: Subject) => {
    setSubjectMenuAnchor(event.currentTarget)
    setActiveSubjectMenu(item)
  }

  const handleCloseSubjectMenu = () => {
    setSubjectMenuAnchor(null)
    setActiveSubjectMenu(null)
  }

  const handleOpenGradeCreate = () => {
    setGradeFormMode('create')
    setGradeName('')
    setGradeClassIds([])
    setGradeSectionIds([])
    setGradeSubjectIds([])
    setGradeStatus('Active')
    setIsGradeFormOpen(true)
  }

  const findIdsFromNames = (names: string[], options: AcademicOption[]) =>
    names.map((name) => options.find((opt) => opt.name === name)?.id).filter(Boolean) as string[]

  const handleOpenGradeEdit = (item: Grade) => {
    setGradeFormMode('edit')
    setSelectedGrade(item)
    setGradeName(item.name)
    setGradeClassIds(findIdsFromNames(item.classes, metadata?.classes ?? []))
    setGradeSectionIds(findIdsFromNames(item.sections, metadata?.sections ?? []))
    setGradeSubjectIds(findIdsFromNames(item.subjects, metadata?.subjects ?? []))
    setGradeStatus(item.status)
    setIsGradeFormOpen(true)
  }

  const handleDeleteGrade = async (id: string, name: string) => {
    await deleteGradeMutation(id).unwrap()
    dispatch(uiSlice.actions.addNotification({ message: `Successfully deleted grade ${name}!`, type: 'success' }))
  }

  const handleToggleGradeStatus = async (id: string) => {
    const current = gradeRows.find((grade) => grade.id === id)
    if (!current) return

    await updateGrade({
      id,
      payload: {
        name: current.name,
        status: current.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
        classIds: current.classes.map((item) => item.id),
        sectionIds: current.sections.map((item) => item.id),
        subjectIds: current.subjects.map((item) => item.id),
      },
    }).unwrap()

    dispatch(uiSlice.actions.addNotification({ message: 'Successfully updated grade status!', type: 'success' }))
  }

  const handleSubmitGradeForm = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      name: gradeName,
      status: fromStatus(gradeStatus),
      classIds: gradeClassIds,
      sectionIds: gradeSectionIds,
      subjectIds: gradeSubjectIds,
    }

    if (gradeFormMode === 'create') {
      await createGrade(payload).unwrap()
      dispatch(uiSlice.actions.addNotification({ message: `Grade ${gradeName} created!`, type: 'success' }))
    } else if (selectedGrade) {
      await updateGrade({ id: selectedGrade.id, payload }).unwrap()
      dispatch(uiSlice.actions.addNotification({ message: `Grade ${gradeName} updated!`, type: 'success' }))
    }

    setIsGradeFormOpen(false)
  }

  const handleOpenSubjectCreate = () => {
    setSubjectFormMode('create')
    setSubjectName('')
    setSubjectCode('')
    setSubjectGradeIds([])
    setSubjectClassIds([])
    setSubjectTeacherIds([])
    setSubjectStatus('Active')
    setIsSubjectFormOpen(true)
  }

  const handleOpenSubjectEdit = (item: Subject) => {
    setSubjectFormMode('edit')
    setSelectedSubject(item)
    setSubjectName(item.name)
    setSubjectCode(item.code)
    setSubjectGradeIds(findIdsFromNames(item.grades, metadata?.grades ?? []))
    setSubjectClassIds(findIdsFromNames(item.classes, metadata?.classes ?? []))
    setSubjectTeacherIds(findIdsFromNames(item.assignedTeachers, metadata?.teachers ?? []))
    setSubjectStatus(item.status)
    setIsSubjectFormOpen(true)
  }

  const handleDeleteSubject = async (id: string, name: string) => {
    await deleteSubjectMutation(id).unwrap()
    dispatch(uiSlice.actions.addNotification({ message: `Successfully deleted subject ${name}!`, type: 'success' }))
  }

  const handleSubmitSubjectForm = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      name: subjectName,
      code: subjectCode,
      status: fromStatus(subjectStatus),
      gradeIds: subjectGradeIds,
      classIds: subjectClassIds,
      teacherIds: subjectTeacherIds,
    }

    if (subjectFormMode === 'create') {
      await createSubject(payload).unwrap()
      dispatch(uiSlice.actions.addNotification({ message: `Subject ${subjectName} created!`, type: 'success' }))
    } else if (selectedSubject) {
      await updateSubject({ id: selectedSubject.id, payload }).unwrap()
      dispatch(uiSlice.actions.addNotification({ message: `Subject ${subjectName} updated!`, type: 'success' }))
    }

    setIsSubjectFormOpen(false)
  }

  return {
    grades,
    subjects,
    filteredGrades,
    filteredSubjects,
    searchGradeQuery,
    setSearchGradeQuery,
    searchSubjectQuery,
    setSearchSubjectQuery,
    isLoading: isGradesLoading || isSubjectsLoading,
    isSaving: isCreatingGrade || isUpdatingGrade || isCreatingSubject || isUpdatingSubject,

    isGradeFormOpen,
    setIsGradeFormOpen,
    gradeFormMode,
    selectedGrade,
    gradeMenuAnchor,
    activeGradeMenu,
    handleOpenGradeMenu,
    handleCloseGradeMenu,
    handleOpenGradeCreate,
    handleOpenGradeEdit,
    handleDeleteGrade,
    handleToggleGradeStatus,
    handleSubmitGradeForm,
    gradeFields: {
      gradeName,
      setGradeName,
      gradeClassIds,
      setGradeClassIds,
      gradeSectionIds,
      setGradeSectionIds,
      gradeSubjectIds,
      setGradeSubjectIds,
      gradeStatus,
      setGradeStatus,
      classOptions: metadata?.classes ?? [],
      sectionOptions: metadata?.sections ?? [],
      subjectOptions: metadata?.subjects ?? [],
    },

    isSubjectFormOpen,
    setIsSubjectFormOpen,
    subjectFormMode,
    selectedSubject,
    subjectMenuAnchor,
    activeSubjectMenu,
    handleOpenSubjectMenu,
    handleCloseSubjectMenu,
    handleOpenSubjectCreate,
    handleOpenSubjectEdit,
    handleDeleteSubject,
    handleSubmitSubjectForm,
    subjectFields: {
      subjectName,
      setSubjectName,
      subjectCode,
      setSubjectCode,
      subjectGradeIds,
      setSubjectGradeIds,
      subjectClassIds,
      setSubjectClassIds,
      subjectTeacherIds,
      setSubjectTeacherIds,
      subjectStatus,
      setSubjectStatus,
      gradeOptions: metadata?.grades ?? [],
      classOptions: metadata?.classes ?? [],
      teacherOptions: metadata?.teachers ?? [],
    },

    isAcademicAdmin: role === 'super-admin' || role === 'principal',
  }
}
