import React, { useEffect } from 'react';
import { PlusIcon, XMarkIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { compareServices, clearComparison } from '../store/slices/comparisonSlice';
import ServiceCard from '../components/Services/ServiceCard';
import ComparisonTable from '../components/Comparison/ComparisonTable';
import ServiceSelector from '../components/Comparison/ServiceSelector';

const Compare: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedServices, comparison, loading } = useAppSelector(state => state.comparison);

  useEffect(() => {
    if (selectedServices.length >= 2) {
      const serviceIds = selectedServices.map(s => s.id);
      dispatch(compareServices(serviceIds));
    }
  }, [selectedServices, dispatch]);

  const handleClearComparison = () => {
    dispatch(clearComparison());
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Comparison</h1>
          <p className="text-gray-600 mt-2">
            Compare up to 5 cloud services side-by-side to find the best fit for your needs
          </p>
        </div>
        
        {selectedServices.length > 0 && (
          <button
            onClick={handleClearComparison}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            Clear All
          </button>
        )}
      </div>

      {/* Selected Services */}
      {selectedServices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Selected Services ({selectedServices.length}/5)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {selectedServices.map((service) => (
              <div key={service.id} className="relative">
                <ServiceCard service={service} showComparison={false} />
              </div>
            ))}
            
            {selectedServices.length < 5 && (
              <div className="card p-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors">
                <PlusIcon className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  Add another service to compare
                </p>
                <ServiceSelector />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {selectedServices.length >= 2 && comparison && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Detailed Comparison</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ArrowsUpDownIcon className="h-4 w-4" />
              <span>Scroll to see all features</span>
            </div>
          </div>

          <ComparisonTable comparison={comparison} loading={loading} />
        </div>
      )}

      {/* Empty State */}
      {selectedServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Comparing Services</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Select cloud services from different providers to see a detailed side-by-side comparison of features, pricing, and capabilities.
          </p>
          <ServiceSelector />
        </div>
      )}
    </div>
  );
};

export default Compare;