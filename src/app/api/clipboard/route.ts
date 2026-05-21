import { NextRequest, NextResponse } from 'next/server'
import { ok, fail } from '@/shared/api/response'
import { ClipboardItem } from '@/features/clipboard/model/clipboard.types'
import fs from 'fs/promises'
import path from 'path'

const getFilePath = () => path.join(process.cwd(), 'src/mock/clipboard.json')

async function readMockData(): Promise<ClipboardItem[]> {
  try {
    const data = await fs.readFile(getFilePath(), 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading mock data file:', error)
    return []
  }
}

async function writeMockData(data: ClipboardItem[]) {
  try {
    await fs.writeFile(getFilePath(), JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing mock data file:', error)
  }
}

// GET /api/clipboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const items = await readMockData()

    if (id) {
      const item = items.find((item) => item.id === id)
      if (!item) {
        return fail('Clipboard item not found', 404)
      }
      return ok('Clipboard item fetched successfully', item)
    }

    return ok('Clipboard list fetched successfully', items)
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// POST /api/clipboard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    // Request Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return fail('Title is required and must be a valid string', 400)
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return fail('Content is required and must be a valid string', 400)
    }

    const items = await readMockData()
    
    const newItem: ClipboardItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    }

    items.unshift(newItem) // Add to beginning of the array
    await writeMockData(items)

    return ok('Clipboard item created successfully', newItem)
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// PUT /api/clipboard (Fallback/Query-param support)
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    const targetId = id || body.id

    if (!targetId) {
      return fail('Clipboard item ID is required', 400)
    }

    const { title, content } = body

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return fail('Title is required and must be a valid string', 400)
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return fail('Content is required and must be a valid string', 400)
    }

    const items = await readMockData()
    const index = items.findIndex((item) => item.id === targetId)

    if (index === -1) {
      return fail('Clipboard item not found', 404)
    }

    const updatedItem = {
      ...items[index],
      title: title.trim(),
      content: content.trim(),
    }

    items[index] = updatedItem
    await writeMockData(items)

    return ok('Clipboard item updated successfully', updatedItem)
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}

// DELETE /api/clipboard (Fallback/Query-param support)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return fail('Clipboard item ID is required', 400)
    }

    let items = await readMockData()
    const exists = items.some((item) => item.id === id)

    if (!exists) {
      return fail('Clipboard item not found', 404)
    }

    items = items.filter((item) => item.id !== id)
    await writeMockData(items)

    return ok('Clipboard item deleted successfully', { id })
  } catch (error: any) {
    return fail(error.message || 'Internal Server Error', 500)
  }
}
