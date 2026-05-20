import { ApiResponse } from '@/shared/api/contracts'

export interface Guardian {
  id: string
  name: string
  relation: string
  phone: string
  altPhone: string
  email: string
  address: string
  linkedStudentRolls: string[]
}

const guardianRows: Guardian[] = [
  {
    id: '1',
    name: 'David Miller',
    relation: 'Father',
    phone: '+91 98765 43220',
    altPhone: '+91 98765 43221',
    email: 'david.miller@parent.com',
    address: '42 Baker St, London, UK',
    linkedStudentRolls: ['ST-0092', 'ST-0094'],
  },
  {
    id: '2',
    name: 'Linda Watson',
    relation: 'Mother',
    phone: '+91 98765 43222',
    altPhone: '',
    email: 'linda.w@parent.com',
    address: '88 Primrose Lane, Manchester, UK',
    linkedStudentRolls: ['ST-0093'],
  },
  {
    id: '3',
    name: 'Alice Johnson',
    relation: 'Guardian',
    phone: '+91 98765 43223',
    altPhone: '+91 98765 43224',
    email: 'alice.j@parent.com',
    address: '15 High Street, Oxford, UK',
    linkedStudentRolls: ['ST-0095', 'ST-0096'],
  },
]

export const guardiansMockResponse: ApiResponse<Guardian[]> = {
  success: true,
  message: 'guardians list fetched',
  data: guardianRows,
  meta: {
    page: 1,
    limit: 10,
    total: guardianRows.length,
  },
}
