import { NextRequest } from 'next/server'
import { ok } from '@/shared/api/response'

export async function GET(request: NextRequest) {
  return ok('upload list fetched', [], { page: 1, limit: 10, total: 0 })
}

export async function POST() {
  return ok('upload create action accepted', {})
}

export async function PATCH() {
  return ok('upload patch action accepted', {})
}

export async function DELETE() {
  return ok('upload delete action accepted', {})
}
