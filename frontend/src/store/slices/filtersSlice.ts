import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchFilters } from '../../types';

interface FiltersState {
  filters: SearchFilters;
  recentSearches: string[];
}

const initialState: FiltersState = {
  filters: {
    query: '',
    providers: [],
    categories: [],
    subCategories: [],
    features: [],
    pricingModel: [],
    maturity: [],
  },
  recentSearches: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.filters.query = action.payload;
    },
    setProviders: (state, action: PayloadAction<string[]>) => {
      state.filters.providers = action.payload;
    },
    toggleProvider: (state, action: PayloadAction<string>) => {
      const provider = action.payload;
      const providers = state.filters.providers || [];
      if (providers.includes(provider)) {
        state.filters.providers = providers.filter(p => p !== provider);
      } else {
        state.filters.providers = [...providers, provider];
      }
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const categories = state.filters.categories || [];
      if (categories.includes(category)) {
        state.filters.categories = categories.filter(c => c !== category);
      } else {
        state.filters.categories = [...categories, category];
      }
    },
    setFeatures: (state, action: PayloadAction<string[]>) => {
      state.filters.features = action.payload;
    },
    toggleFeature: (state, action: PayloadAction<string>) => {
      const feature = action.payload;
      const features = state.filters.features || [];
      if (features.includes(feature)) {
        state.filters.features = features.filter(f => f !== feature);
      } else {
        state.filters.features = [...features, feature];
      }
    },
    setPricingModel: (state, action: PayloadAction<string[]>) => {
      state.filters.pricingModel = action.payload;
    },
    setMaturity: (state, action: PayloadAction<string[]>) => {
      state.filters.maturity = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches = [query, ...state.recentSearches.slice(0, 9)]; // Keep last 10
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  setQuery,
  setProviders,
  toggleProvider,
  setCategories,
  toggleCategory,
  setFeatures,
  toggleFeature,
  setPricingModel,
  setMaturity,
  clearFilters,
  addRecentSearch,
  clearRecentSearches,
} = filtersSlice.actions;

export default filtersSlice.reducer;