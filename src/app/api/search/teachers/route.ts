import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('search/teachers list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('search/teachers create action accepted', {})
}

export async function PATCH() {
  return ok('search/teachers patch action accepted', {})
}

export async function DELETE() {
  return ok('search/teachers delete action accepted', {})
}
