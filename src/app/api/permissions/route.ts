import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('permissions list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('permissions create action accepted', {})
}

export async function PATCH() {
  return ok('permissions patch action accepted', {})
}

export async function DELETE() {
  return ok('permissions delete action accepted', {})
}
