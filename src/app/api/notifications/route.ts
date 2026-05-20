import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('notifications list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('notifications create action accepted', {})
}

export async function PATCH() {
  return ok('notifications patch action accepted', {})
}

export async function DELETE() {
  return ok('notifications delete action accepted', {})
}
