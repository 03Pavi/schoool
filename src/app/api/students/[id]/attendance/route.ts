import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// GET /api/students/:id/attendance
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}/api/students/${id}/attendance${searchParams ? `?${searchParams}` : ''}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers,
    },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
