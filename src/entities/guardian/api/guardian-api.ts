import { ApiResponse } from '@/shared/api/contracts'
import { guardiansMockResponse, Guardian } from '@/shared/mock/guardians.mock'

const API_MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'mock'
const MOCK_DELAY_MS = 250

const withMockDelay = async <T>(payload: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(payload), MOCK_DELAY_MS))

export const guardianApi = {
  async getGuardians(): Promise<ApiResponse<Guardian[]>> {
    if (API_MODE === 'mock') {
      return withMockDelay(guardiansMockResponse)
    }

    const response = await fetch('/api/guardians', { method: 'GET' })
    if (!response.ok) {
      throw new Error('Unable to fetch guardians')
    }

    return response.json()
  },
}
