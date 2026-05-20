import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('dashboard/teacher list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('dashboard/teacher create action accepted', {})
}

export async function PATCH() {
  return ok('dashboard/teacher patch action accepted', {})
}

export async function DELETE() {
  return ok('dashboard/teacher delete action accepted', {})
}
