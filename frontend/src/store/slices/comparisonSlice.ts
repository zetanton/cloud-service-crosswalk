import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CloudService, ServiceComparison } from '../../types';
import * as api from '../../services/api';

interface ComparisonState {
  selectedServices: CloudService[];
  comparison: ServiceComparison | null;
  loading: boolean;
  error: string | null;
}

const initialState: ComparisonState = {
  selectedServices: [],
  comparison: null,
  loading: false,
  error: null,
};

// Async thunks
export const compareServices = createAsyncThunk(
  'comparison/compareServices',
  async (serviceIds: string[]) => {
    const response = await api.compareServices({
      serviceIds,
      includeFeatures: true,
      includePricing: true,
    });
    return response.data;
  }
);

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addServiceToComparison: (state, action: PayloadAction<CloudService>) => {
      const service = action.payload;
      if (!state.selectedServices.find(s => s.id === service.id) && state.selectedServices.length < 5) {
        state.selectedServices.push(service);
      }
    },
    removeServiceFromComparison: (state, action: PayloadAction<string>) => {
      const serviceId = action.payload;
      state.selectedServices = state.selectedServices.filter(s => s.id !== serviceId);
    },
    clearComparison: (state) => {
      state.selectedServices = [];
      state.comparison = null;
    },
    reorderServices: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const services = [...state.selectedServices];
      const [movedService] = services.splice(fromIndex, 1);
      services.splice(toIndex, 0, movedService);
      state.selectedServices = services;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(compareServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(compareServices.fulfilled, (state, action) => {
        state.loading = false;
        state.comparison = action.payload;
      })
      .addCase(compareServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to compare services';
      });
  },
});

export const {
  addServiceToComparison,
  removeServiceFromComparison,
  clearComparison,
  reorderServices,
  clearError,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;