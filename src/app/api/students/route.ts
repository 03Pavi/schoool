import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('students list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('students create action accepted', {})
}

export async function PATCH() {
  return ok('students patch action accepted', {})
}

export async function DELETE() {
  return ok('students delete action accepted', {})
}
