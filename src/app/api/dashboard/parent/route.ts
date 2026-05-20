import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('dashboard/parent list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('dashboard/parent create action accepted', {})
}

export async function PATCH() {
  return ok('dashboard/parent patch action accepted', {})
}

export async function DELETE() {
  return ok('dashboard/parent delete action accepted', {})
}
