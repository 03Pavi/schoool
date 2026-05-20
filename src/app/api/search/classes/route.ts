import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('search/classes list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('search/classes create action accepted', {})
}

export async function PATCH() {
  return ok('search/classes patch action accepted', {})
}

export async function DELETE() {
  return ok('search/classes delete action accepted', {})
}
