import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('guardians list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('guardians create action accepted', {})
}

export async function PATCH() {
  return ok('guardians patch action accepted', {})
}

export async function DELETE() {
  return ok('guardians delete action accepted', {})
}
