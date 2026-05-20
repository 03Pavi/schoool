import { NextResponse } from 'next/server'
import type { ApiResponse } from './contracts'

export const ok = <T>(message: string, data?: T, meta?: ApiResponse<T>['meta']) =>
  NextResponse.json<ApiResponse<T>>({ success: true, message, data, meta })

export const fail = (message: string, status = 400) =>
  NextResponse.json<ApiResponse<null>>({ success: false, message }, { status })
