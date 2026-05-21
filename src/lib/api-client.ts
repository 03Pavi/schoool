import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define the API response envelope type from OpenAPI
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api', // From OpenAPI servers[0].url
  timeout: 10000,
});

// Request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Assuming the API always returns the envelope structure
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally if needed
    // For now, we'll reject with the error
    return Promise.reject(error);
  }
);

export default apiClient;