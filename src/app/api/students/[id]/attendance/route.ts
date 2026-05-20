import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'
import { attendanceRecords } from '@/app/api/attendance/_data'
import type { AttendanceRecord } from '@/entities/attendance/types'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const page = Number(request.nextUrl.searchParams.get('page') ?? '1')
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? '10')

  const studentRows = attendanceRecords.filter((row) => row.studentId === id)
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10
  const start = (safePage - 1) * safeLimit
  const data = studentRows.slice(start, start + safeLimit)

  return ok<AttendanceRecord[]>('student attendance fetched', data, {
    page: safePage,
    limit: safeLimit,
    total: studentRows.length,
  })
}
