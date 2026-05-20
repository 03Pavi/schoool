export type RecordStatus = 'ACTIVE' | 'INACTIVE'

export interface OptionItem {
  id: string
  name: string
}

export interface GradeItem {
  id: string
  name: string
  status: RecordStatus
  classIds: string[]
  sectionIds: string[]
  subjectIds: string[]
}

export interface SubjectItem {
  id: string
  name: string
  code: string
  status: RecordStatus
  gradeIds: string[]
  classIds: string[]
  teacherIds: string[]
}

const genId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`

export const classes: OptionItem[] = [
  { id: 'class_a', name: 'Class A' },
  { id: 'class_b', name: 'Class B' },
  { id: 'class_lab', name: 'Lab Group' },
]

export const sections: OptionItem[] = [
  { id: 'sec_a', name: 'A' },
  { id: 'sec_b', name: 'B' },
  { id: 'sec_activity', name: 'Activity' },
]

export const teachers: OptionItem[] = [
  { id: 'teacher_emma', name: 'Mrs. Emma Watson' },
  { id: 'teacher_clark', name: 'Mr. Johnathan Clark' },
  { id: 'teacher_grace', name: 'Mrs. Grace Miller' },
]

export const gradesMaster: OptionItem[] = [
  { id: 'grade_10', name: 'Grade 10' },
  { id: 'grade_9', name: 'Grade 9' },
  { id: 'grade_kg', name: 'Kindergarten' },
]

export const subjectsMaster: OptionItem[] = [
  { id: 'sub_math', name: 'Mathematics' },
  { id: 'sub_sci', name: 'Science' },
  { id: 'sub_cs', name: 'Computer Science' },
]

export const grades: GradeItem[] = [
  {
    id: genId('grade'),
    name: 'Grade 10',
    status: 'ACTIVE',
    classIds: ['class_a', 'class_b'],
    sectionIds: ['sec_a', 'sec_b'],
    subjectIds: ['sub_math', 'sub_sci'],
  },
]

export const subjects: SubjectItem[] = [
  {
    id: genId('subject'),
    name: 'Mathematics',
    code: 'MATH-101',
    status: 'ACTIVE',
    gradeIds: ['grade_10', 'grade_9'],
    classIds: ['class_a'],
    teacherIds: ['teacher_emma'],
  },
]

export const findByIds = (pool: OptionItem[], ids: string[]) =>
  ids.map((id) => pool.find((item) => item.id === id)).filter(Boolean) as OptionItem[]

export const createId = genId
