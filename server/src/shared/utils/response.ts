export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export const ok = <T>(message: string, data: T): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const fail = (message: string, status = 400): ApiResponse => ({
  success: false,
  message,
  data: null,
});