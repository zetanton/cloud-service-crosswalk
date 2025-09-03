import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import filtersReducer from './slices/filtersSlice';
import comparisonReducer from './slices/comparisonSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    filters: filtersReducer,
    comparison: comparisonReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;