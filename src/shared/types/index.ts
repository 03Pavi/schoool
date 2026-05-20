// Common application types and interfaces
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}
