// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

// Error response
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}