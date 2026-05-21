import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// GET /api/teachers
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}/api/teachers${searchParams ? `?${searchParams}` : ''}`
  
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

// POST /api/teachers
export async function POST(request: NextRequest) {
  const body = await request.json()
  const url = `${BACKEND_URL}/api/teachers`
  
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

// PATCH /api/teachers/:id
export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const body = await request.json()
  const url = `${BACKEND_URL}/api/teachers?${searchParams}`
  
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

// DELETE /api/teachers/:id
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}/api/teachers?${searchParams}`
  
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