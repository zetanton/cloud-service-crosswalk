import { 
  CloudProvider, 
  ServiceCategory, 
  CloudService, 
  SearchFilters, 
  SearchResult, 
  ServiceComparison,
  ApiResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

// Provider APIs
export async function getProviders(): Promise<ApiResponse<CloudProvider[]>> {
  return apiRequest<CloudProvider[]>('/providers');
}

export async function getProviderById(providerId: string): Promise<ApiResponse<CloudProvider>> {
  return apiRequest<CloudProvider>(`/providers/${providerId}`);
}

// Category APIs
export async function getCategories(): Promise<ApiResponse<ServiceCategory[]>> {
  return apiRequest<ServiceCategory[]>('/categories');
}

export async function getCategoryById(categoryId: string): Promise<ApiResponse<ServiceCategory>> {
  return apiRequest<ServiceCategory>(`/categories/${categoryId}`);
}

// Service APIs
export async function searchServices(filters: SearchFilters): Promise<ApiResponse<SearchResult>> {
  const params = new URLSearchParams();
  
  if (filters.query) params.append('query', filters.query);
  if (filters.providers?.length) {
    filters.providers.forEach(provider => params.append('provider', provider));
  }
  if (filters.categories?.length) {
    filters.categories.forEach(category => params.append('category', category));
  }
  if (filters.subCategories?.length) {
    filters.subCategories.forEach(subCategory => params.append('subCategory', subCategory));
  }
  if (filters.features?.length) {
    filters.features.forEach(feature => params.append('features', feature));
  }
  if (filters.pricingModel?.length) {
    filters.pricingModel.forEach(model => params.append('pricingModel', model));
  }
  if (filters.maturity?.length) {
    filters.maturity.forEach(maturity => params.append('maturity', maturity));
  }

  return apiRequest<SearchResult>(`/services/search?${params.toString()}`);
}

export async function getServiceById(serviceId: string): Promise<ApiResponse<CloudService>> {
  return apiRequest<CloudService>(`/services/${serviceId}`);
}

export async function getServicesByProvider(providerId: string): Promise<ApiResponse<CloudService[]>> {
  return apiRequest<CloudService[]>(`/services/provider/${providerId}`);
}

export async function getServicesByCategory(categoryId: string): Promise<ApiResponse<CloudService[]>> {
  return apiRequest<CloudService[]>(`/services/category/${categoryId}`);
}

// Comparison APIs
export async function compareServices(request: {
  serviceIds: string[];
  includeFeatures: boolean;
  includePricing: boolean;
}): Promise<ApiResponse<ServiceComparison>> {
  return apiRequest<ServiceComparison>('/services/compare', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Autocomplete API
export async function getSearchSuggestions(query: string): Promise<ApiResponse<string[]>> {
  const params = new URLSearchParams({ query });
  return apiRequest<string[]>(`/search/suggestions?${params.toString()}`);
}

// Popular searches API
export async function getPopularSearches(): Promise<ApiResponse<string[]>> {
  return apiRequest<string[]>('/search/popular');
}