import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// GET /api/clipboard/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const url = `${BACKEND_URL}/api/clipboard/${id}`
  
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

// PUT /api/clipboard/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const url = `${BACKEND_URL}/api/clipboard/${id}`
  
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers
    },
    body: JSON.stringify(body),
  })
  
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

// DELETE /api/clipboard/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const url = `${BACKEND_URL}/api/clipboard/${id}`
  
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