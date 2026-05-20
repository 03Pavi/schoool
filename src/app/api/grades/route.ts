import { NextRequest } from 'next/server'
import { classes, createId, findByIds, grades, sections, subjectsMaster, type GradeItem, type RecordStatus } from '../academics/_data'
import { parseListQuery, paginate } from '@/shared/api/contracts'
import { fail, ok } from '@/shared/api/response'
import { getRequestRole, hasPermission } from '@/shared/api/rbac'

const mapGrade = (grade: GradeItem) => ({
  id: grade.id,
  name: grade.name,
  status: grade.status,
  classes: findByIds(classes, grade.classIds),
  sections: findByIds(sections, grade.sectionIds),
  subjects: findByIds(subjectsMaster, grade.subjectIds),
})

const parseBody = async (request: NextRequest) => {
  const body = await request.json()
  return {
    name: String(body.name ?? ''),
    status: (body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE') as RecordStatus,
    classIds: Array.isArray(body.classIds) ? body.classIds : [],
    sectionIds: Array.isArray(body.sectionIds) ? body.sectionIds : [],
    subjectIds: Array.isArray(body.subjectIds) ? body.subjectIds : [],
  }
}

export async function GET(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'grade:view')) return fail('Unauthorized', 401)

  const query = parseListQuery(request.nextUrl)
  const rows = grades.map(mapGrade)
  const searched = query.search
    ? rows.filter((row) =>
        `${row.name} ${row.classes.map((c) => c.name).join(' ')} ${row.subjects.map((s) => s.name).join(' ')}`
          .toLowerCase()
          .includes(query.search)
      )
    : rows

  const sorted = [...searched].sort((a, b) => {
    const av = String((a as any)[query.sort] ?? a.name).toLowerCase()
    const bv = String((b as any)[query.sort] ?? b.name).toLowerCase()
    return query.order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const data = paginate(sorted, query.page, query.limit)
  return ok('Grades fetched', data, { page: query.page, limit: query.limit, total: sorted.length })
}

export async function POST(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'grade:create')) return fail('Unauthorized', 401)

  const payload = await parseBody(request)
  if (!payload.name) return fail('Grade name is required', 400)

  const newGrade: GradeItem = {
    id: createId('grade'),
    name: payload.name,
    status: payload.status,
    classIds: payload.classIds,
    sectionIds: payload.sectionIds,
    subjectIds: payload.subjectIds,
  }
  grades.unshift(newGrade)
  return ok('Grade created', mapGrade(newGrade))
}

export async function PATCH(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'grade:update')) return fail('Unauthorized', 401)

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return fail('Grade id is required', 400)

  const payload = await parseBody(request)
  const idx = grades.findIndex((g) => g.id === id)
  if (idx < 0) return fail('Grade not found', 404)

  grades[idx] = {
    ...grades[idx],
    name: payload.name || grades[idx].name,
    status: payload.status,
    classIds: payload.classIds,
    sectionIds: payload.sectionIds,
    subjectIds: payload.subjectIds,
  }

  return ok('Grade updated', mapGrade(grades[idx]))
}

export async function DELETE(request: NextRequest) {
  const role = getRequestRole(request)
  if (!role || !hasPermission(role, 'grade:delete')) return fail('Unauthorized', 401)

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return fail('Grade id is required', 400)

  const idx = grades.findIndex((g) => g.id === id)
  if (idx < 0) return fail('Grade not found', 404)

  grades.splice(idx, 1)
  return ok('Grade deleted', { id })
}
