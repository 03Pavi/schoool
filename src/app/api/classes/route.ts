import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('classes list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('classes create action accepted', {})
}

export async function PATCH() {
  return ok('classes patch action accepted', {})
}

export async function DELETE() {
  return ok('classes delete action accepted', {})
}
