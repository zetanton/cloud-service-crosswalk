import { configureStore } from '@reduxjs/toolkit';
import servicesReducer, { 
  fetchProviders, 
  fetchCategories, 
  searchServices,
  clearError,
  setSelectedService
} from '../slices/servicesSlice';
import { CloudProvider, ServiceCategory, SearchResult } from '../../types';

// Mock API
jest.mock('../../services/api');

describe('servicesSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        services: servicesReducer,
      },
    });
  });

  test('should handle initial state', () => {
    const state = store.getState().services;
    expect(state.services).toEqual([]);
    expect(state.providers).toEqual([]);
    expect(state.categories).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('should handle clearError', () => {
    store.dispatch(clearError());
    const state = store.getState().services;
    expect(state.error).toBe(null);
  });

  test('should handle setSelectedService', () => {
    const mockService = {
      id: 'test-service',
      name: 'Test Service',
      displayName: 'Test',
      provider: 'aws',
      category: 'compute',
      description: 'Test service',
      icon: '🚀',
      logo: '/test.svg',
      features: [],
      pricing: { model: 'pay-per-use' },
      regions: [],
      sla: { uptime: 99.9, description: 'Test SLA' },
      useCases: [],
      limitations: [],
      integrations: [],
      sdk: [],
      api: { rest: true, sdk: true, cli: true },
      maturity: 'stable' as const,
      launchDate: '2024-01-01',
      lastUpdated: '2024-12-01'
    };

    store.dispatch(setSelectedService(mockService));
    const state = store.getState().services;
    expect(state.selectedService).toEqual(mockService);
  });
});