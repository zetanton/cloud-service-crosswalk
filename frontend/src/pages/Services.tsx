import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdjustmentsHorizontalIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { searchServices } from '../store/slices/servicesSlice';
import { setViewMode } from '../store/slices/uiSlice';
import { setQuery, setProviders, setCategories } from '../store/slices/filtersSlice';
import ServiceGrid from '../components/Services/ServiceGrid';
import FilterPanel from '../components/Filters/FilterPanel';
import SearchResultsHeader from '../components/Search/SearchResultsHeader';

const Services: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const { searchResults, loading } = useAppSelector(state => state.services);
  const { filters } = useAppSelector(state => state.filters);
  const { viewMode } = useAppSelector(state => state.ui);

  useEffect(() => {
    // Initialize filters from URL params
    const query = searchParams.get('query') || '';
    const provider = searchParams.get('provider');
    const category = searchParams.get('category');

    if (query) dispatch(setQuery(query));
    if (provider) dispatch(setProviders([provider]));
    if (category) dispatch(setCategories([category]));

    // Perform initial search
    dispatch(searchServices({
      query,
      providers: provider ? [provider] : [],
      categories: category ? [category] : [],
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (filters.query) params.set('query', filters.query);
    if (filters.providers?.length) params.set('provider', filters.providers[0]);
    if (filters.categories?.length) params.set('category', filters.categories[0]);
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleSearch = () => {
    dispatch(searchServices(filters));
  };

  const toggleViewMode = () => {
    dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cloud Services</h1>
          <p className="text-gray-600 mt-2">
            Discover and compare cloud services across all major providers
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={toggleViewMode}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Squares2X2Icon className="h-4 w-4" />
            </button>
            <button
              onClick={toggleViewMode}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ListBulletIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        {showFilters && (
          <div className="w-80 flex-shrink-0">
            <FilterPanel onApplyFilters={handleSearch} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search Results Header */}
          <SearchResultsHeader 
            results={searchResults}
            loading={loading}
            onSearch={handleSearch}
          />

          {/* Services Grid/List */}
          <ServiceGrid 
            services={searchResults?.services || []}
            loading={loading}
            emptyMessage="No services match your search criteria"
          />

          {/* Load More Button */}
          {searchResults?.hasMore && (
            <div className="text-center">
              <button className="btn-primary">
                Load More Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;