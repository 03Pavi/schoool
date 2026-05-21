export interface ClipboardItem {
  id: string
  title: string
  content: string
  createdAt: string
}

export interface ClipboardState {
  items: ClipboardItem[]
  loading: boolean
  error: string | null
  currentItem: ClipboardItem | null
}

export interface CreateClipboardPayload {
  title: string
  content: string
}

export interface UpdateClipboardPayload {
  id: string
  title: string
  content: string
}
