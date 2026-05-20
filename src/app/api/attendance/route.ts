import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'
import { attendanceRecords } from './_data'
import type { AttendanceRecord } from '@/entities/attendance/types'

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get('page') ?? '1')
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? '10')
  const studentId = request.nextUrl.searchParams.get('studentId') ?? ''
  const classId = request.nextUrl.searchParams.get('classId') ?? ''
  const date = request.nextUrl.searchParams.get('date') ?? ''
  const teacherId = request.nextUrl.searchParams.get('teacherId') ?? ''
  const search = (request.nextUrl.searchParams.get('search') ?? '').toLowerCase()

  const filtered = attendanceRecords.filter((row) => {
    const matchesStudent = studentId ? row.studentId === studentId : true
    const matchesClass = classId ? row.className.toLowerCase().includes(classId.toLowerCase()) : true
    const matchesDate = date ? row.date === date : true
    const matchesTeacher = teacherId ? row.teacherId === teacherId : true
    const matchesSearch = search
      ? `${row.studentName} ${row.rollNumber} ${row.className}`.toLowerCase().includes(search)
      : true
    return matchesStudent && matchesClass && matchesDate && matchesTeacher && matchesSearch
  })

  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10
  const start = (safePage - 1) * safeLimit
  const data = filtered.slice(start, start + safeLimit)

  return ok<AttendanceRecord[]>('attendance list fetched', data, {
    page: safePage,
    limit: safeLimit,
    total: filtered.length,
  })
}

export async function POST() {
  return ok('attendance create action accepted', {})
}

export async function PATCH() {
  return ok('attendance patch action accepted', {})
}

export async function DELETE() {
  return ok('attendance delete action accepted', {})
}
