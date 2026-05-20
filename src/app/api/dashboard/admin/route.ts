import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('dashboard/admin list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('dashboard/admin create action accepted', {})
}

export async function PATCH() {
  return ok('dashboard/admin patch action accepted', {})
}

export async function DELETE() {
  return ok('dashboard/admin delete action accepted', {})
}
