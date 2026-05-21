import { NextRequest } from 'next/server'
import { ok, fail } from '@/shared/api/response'
import { AssignmentRow } from '@/features/assignments/model/actions'
import fs from 'fs/promises'
import path from 'path'

const getFilePath = () => path.join(process.cwd(), 'src/mock/assignments.json')

async function readMockData(): Promise<AssignmentRow[]> {
  try {
    const data = await fs.readFile(getFilePath(), 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading mock assignments file:', error)
    return []
  }
}

async function writeMockData(data: AssignmentRow[]) {
  try {
    await fs.writeFile(getFilePath(), JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing mock assignments file:', error)
  }
}

// GET /api/assignments
export async function GET(request: NextRequest) {
  try {
    const items = await readMockData()
    return ok('assignments list fetched', items, { page: 1, limit: 10, total: items.length })
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// POST /api/assignments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, hwCode, class: className, dueDate, status } = body

    if (!title || !hwCode || !className || !dueDate) {
      return fail('Missing required fields: title, hwCode, class, dueDate', 400)
    }

    const items = await readMockData()
    const newItem: AssignmentRow = {
      id: `hw-${Math.random().toString(36).substring(2, 9)}`,
      hwCode,
      title,
      class: className,
      dueDate,
      status: status || 'Assigned',
    }

    items.unshift(newItem)
    await writeMockData(items)

    return ok('assignment created successfully', newItem)
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// PATCH /api/assignments?id=...
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return fail('Assignment ID is required', 400)
    }

    const body = await request.json()
    const items = await readMockData()
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) {
      return fail('Assignment not found', 404)
    }

    const updatedItem = {
      ...items[index],
      ...body,
    }

    items[index] = updatedItem
    await writeMockData(items)

    return ok('assignment updated successfully', updatedItem)
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// DELETE /api/assignments?id=...
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return fail('Assignment ID is required', 400)
    }

    let items = await readMockData()
    const exists = items.some((item) => item.id === id)

    if (!exists) {
      return fail('Assignment not found', 404)
    }

    items = items.filter((item) => item.id !== id)
    await writeMockData(items)

    return ok('assignment deleted successfully', { id })
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}
