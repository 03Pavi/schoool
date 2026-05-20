import type { AcademicMetadata, GradeRow, SubjectRow } from '@/features/manage-academics/api/academic-api'

const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export const normalizeGradeRows = (input: unknown): GradeRow[] => {
  if (Array.isArray(input)) return input as GradeRow[]
  if (input && typeof input === 'object' && Array.isArray((input as any).data)) {
    return (input as any).data as GradeRow[]
  }
  return []
}

export const normalizeSubjectRows = (input: unknown): SubjectRow[] => {
  if (Array.isArray(input)) return input as SubjectRow[]
  if (input && typeof input === 'object' && Array.isArray((input as any).data)) {
    return (input as any).data as SubjectRow[]
  }
  return []
}

export const normalizeMetadata = (input: unknown): AcademicMetadata => {
  const fallback: AcademicMetadata = {
    grades: [],
    classes: [],
    sections: [],
    subjects: [],
    teachers: [],
  }

  if (!input || typeof input !== 'object') return fallback
  const source = (input as any).data && typeof (input as any).data === 'object' ? (input as any).data : input

  return {
    grades: asArray(source.grades),
    classes: asArray(source.classes),
    sections: asArray(source.sections),
    subjects: asArray(source.subjects),
    teachers: asArray(source.teachers),
  }
}
