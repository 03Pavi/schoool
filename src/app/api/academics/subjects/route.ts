import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// GET /api/academics/subjects
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}/api/academics/subjects${searchParams ? `?${searchParams}` : ''}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers
    },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

// POST /api/academics/subjects
export async function POST(request: NextRequest) {
  const body = await request.json()
  const url = `${BACKEND_URL}/api/academics/subjects`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

// PATCH /api/academics/subjects/:id
export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const body = await request.json()
  const url = `${BACKEND_URL}/api/academics/subjects?${searchParams}`

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

// DELETE /api/academics/subjects/:id
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}/api/academics/subjects?${searchParams}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers
    },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
