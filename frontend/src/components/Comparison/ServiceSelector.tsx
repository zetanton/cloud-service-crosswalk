import React, { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchServices } from '../../store/slices/servicesSlice';
import { addServiceToComparison } from '../../store/slices/comparisonSlice';
import { CloudService } from '../../types';

const ServiceSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchResults, loading } = useAppSelector(state => state.services);
  const { selectedServices } = useAppSelector(state => state.comparison);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      dispatch(searchServices({ query }));
    }
  };

  const handleServiceSelect = (service: CloudService) => {
    dispatch(addServiceToComparison(service));
    setIsOpen(false);
    setSearchQuery('');
  };

  const availableServices = searchResults?.services.filter(
    service => !selectedServices.some(selected => selected.id === service.id)
  ) || [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary mt-4"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Service
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-4">
            {/* Search Input */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for services..."
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
                autoFocus
              />
            </div>

            {/* Service Results */}
            <div className="max-h-60 overflow-y-auto">
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Searching...</p>
                </div>
              )}

              {!loading && searchQuery.length > 2 && availableServices.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No services found for "{searchQuery}"</p>
                </div>
              )}

              {!loading && availableServices.length > 0 && (
                <div className="space-y-2">
                  {availableServices.slice(0, 10).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full text-left p-3 rounded-md hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{service.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {service.displayName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {service.provider.toUpperCase()} • {service.category}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.length <= 2 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Type to search for services</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;