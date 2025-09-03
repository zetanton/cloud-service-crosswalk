import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleDarkMode, setViewMode } from '../store/slices/uiSlice';
import { clearRecentSearches } from '../store/slices/filtersSlice';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { darkMode, viewMode } = useAppSelector(state => state.ui);
  const { recentSearches } = useAppSelector(state => state.filters);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Customize your experience with the Cloud Service Crosswalk Tool
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Display Preferences */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h2>
          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                <p className="text-sm text-gray-500">Use dark theme for better viewing in low light</p>
              </div>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* View Mode */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Default View Mode</label>
                <p className="text-sm text-gray-500">Choose your preferred layout for service listings</p>
              </div>
              <div className="flex rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => dispatch(setViewMode('grid'))}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => dispatch(setViewMode('list'))}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Preferences */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Preferences</h2>
          <div className="space-y-4">
            {/* Recent Searches */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Recent Searches</label>
                <p className="text-sm text-gray-500">
                  You have {recentSearches.length} recent searches stored
                </p>
              </div>
              <button
                onClick={() => dispatch(clearRecentSearches())}
                disabled={recentSearches.length === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>

        {/* Data Preferences */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Include Pricing</label>
                <p className="text-sm text-gray-500">Show pricing information in service comparisons</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Show Beta Services</label>
                <p className="text-sm text-gray-500">Include beta and experimental services in results</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Data Update</span>
              <span className="font-medium">December 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Total Services</span>
              <span className="font-medium">1000+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;