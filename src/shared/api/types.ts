export type ApiMode = 'mock' | 'development' | 'production'

export type ApiErrorPayload = {
  success: false
  message: string
}

export type ApiMeta = {
  page?: number
  limit?: number
  total?: number
}
