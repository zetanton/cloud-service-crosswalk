import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CloudService, CloudProvider, ServiceCategory, SearchResult, SearchFilters } from '../../types';
import * as api from '../../services/api';

interface ServicesState {
  services: CloudService[];
  providers: CloudProvider[];
  categories: ServiceCategory[];
  searchResults: SearchResult | null;
  selectedService: CloudService | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  providers: [],
  categories: [],
  searchResults: null,
  selectedService: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProviders = createAsyncThunk(
  'services/fetchProviders',
  async () => {
    const response = await api.getProviders();
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'services/fetchCategories',
  async () => {
    const response = await api.getCategories();
    return response.data;
  }
);

export const searchServices = createAsyncThunk(
  'services/searchServices',
  async (filters: SearchFilters) => {
    const response = await api.searchServices(filters);
    return response.data;
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (serviceId: string) => {
    const response = await api.getServiceById(serviceId);
    return response.data;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = null;
    },
    setSelectedService: (state, action: PayloadAction<CloudService | null>) => {
      state.selectedService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch providers
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch providers';
      })
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Search services
      .addCase(searchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search services';
      })
      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch service';
      });
  },
});

export const { clearError, clearSearchResults, setSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;