export type ApiResponse<T> = {
  success: boolean
  message: string
  data?: T
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

export type ListQuery = {
  page: number
  limit: number
  search: string
  sort: string
  order: 'asc' | 'desc'
}

export const parseListQuery = (url: URL): ListQuery => {
  const page = Number(url.searchParams.get('page') ?? '1')
  const limit = Number(url.searchParams.get('limit') ?? '10')
  const search = (url.searchParams.get('search') ?? '').trim().toLowerCase()
  const sort = (url.searchParams.get('sort') ?? 'name').trim()
  const rawOrder = (url.searchParams.get('order') ?? 'asc').toLowerCase()

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 10,
    search,
    sort,
    order: rawOrder === 'desc' ? 'desc' : 'asc',
  }
}

export const paginate = <T>(rows: T[], page: number, limit: number) => {
  const start = (page - 1) * limit
  const end = start + limit
  return rows.slice(start, end)
}
