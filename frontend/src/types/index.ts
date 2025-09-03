// Re-export shared types
export * from '../../../shared/dist/types/services';
export * from '../../../shared/dist/types/providers';
export * from '../../../shared/dist/types/categories';
export * from '../../../shared/dist/types/api';
export * from '../../../shared/dist/utils/constants';

// Additional frontend-specific types
export interface AppState {
  currentProvider: string | null;
  selectedServices: string[];
  searchFilters: SearchFilters;
  comparisonMode: boolean;
  loading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}