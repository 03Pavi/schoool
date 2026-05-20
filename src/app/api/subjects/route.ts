import { NextRequest } from 'next/server'
import { classes, createId, findByIds, gradesMaster, subjects, teachers, type RecordStatus, type SubjectItem } from '../academics/_data'
import { parseListQuery, paginate } from '@/shared/api/contracts'
import { fail, ok } from '@/shared/api/response'
import { getRequestRole, hasPermission } from '@/shared/api/rbac'

const mapSubject = (subject: SubjectItem) => ({
  id: subject.id,
  name: subject.name,
  code: subject.code,
  status: subject.status,
  grades: findByIds(gradesMaster, subject.gradeIds),
  classes: findByIds(classes, subject.classIds),
  assignedTeachers: findByIds(teachers, subject.teacherIds),
})

const parseBody = async (request: NextRequest) => {
  const body = await request.json()
  return {
    name: String(body.name ?? ''),
    code: String(body.code ?? ''),
    status: (body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE') as RecordStatus,
    gradeIds: Array.isArray(body.gradeIds) ? body.gradeIds : [],
    classIds: Array.isArray(body.classIds) ? body.classIds : [],
    teacherIds: Array.isArray(body.teacherIds) ? body.teacherIds : [],
  }
}

export async function GET(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'subject:view')) return fail('Unauthorized', 401)

  const query = parseListQuery(request.nextUrl)
  const rows = subjects.map(mapSubject)
  const searched = query.search
    ? rows.filter((row) => `${row.name} ${row.code} ${row.grades.map((g) => g.name).join(' ')}`.toLowerCase().includes(query.search))
    : rows

  const sorted = [...searched].sort((a, b) => {
    const av = String((a as any)[query.sort] ?? a.name).toLowerCase()
    const bv = String((b as any)[query.sort] ?? b.name).toLowerCase()
    return query.order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const data = paginate(sorted, query.page, query.limit)
  return ok('Subjects fetched', data, { page: query.page, limit: query.limit, total: sorted.length })
}

export async function POST(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'subject:create')) return fail('Unauthorized', 401)

  const payload = await parseBody(request)
  if (!payload.name || !payload.code) return fail('Subject name and code are required', 400)

  const newSubject: SubjectItem = {
    id: createId('subject'),
    name: payload.name,
    code: payload.code,
    status: payload.status,
    gradeIds: payload.gradeIds,
    classIds: payload.classIds,
    teacherIds: payload.teacherIds,
  }

  subjects.unshift(newSubject)
  return ok('Subject created', mapSubject(newSubject))
}

export async function PATCH(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'subject:update')) return fail('Unauthorized', 401)

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return fail('Subject id is required', 400)

  const payload = await parseBody(request)
  const idx = subjects.findIndex((s) => s.id === id)
  if (idx < 0) return fail('Subject not found', 404)

  subjects[idx] = {
    ...subjects[idx],
    name: payload.name || subjects[idx].name,
    code: payload.code || subjects[idx].code,
    status: payload.status,
    gradeIds: payload.gradeIds,
    classIds: payload.classIds,
    teacherIds: payload.teacherIds,
  }

  return ok('Subject updated', mapSubject(subjects[idx]))
}

export async function DELETE(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'subject:delete')) return fail('Unauthorized', 401)

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return fail('Subject id is required', 400)

  const idx = subjects.findIndex((s) => s.id === id)
  if (idx < 0) return fail('Subject not found', 404)

  subjects.splice(idx, 1)
  return ok('Subject deleted', { id })
}
