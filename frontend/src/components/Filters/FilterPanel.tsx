import React, { useEffect } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  toggleProvider, 
  toggleCategory, 
  toggleFeature, 
  clearFilters 
} from '../../store/slices/filtersSlice';
import { fetchProviders, fetchCategories } from '../../store/slices/servicesSlice';
import clsx from 'clsx';

interface FilterPanelProps {
  onApplyFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.filters);
  const { providers, categories } = useAppSelector(state => state.services);

  useEffect(() => {
    dispatch(fetchProviders());
    dispatch(fetchCategories());
  }, [dispatch]);

  const commonFeatures = [
    'auto-scaling',
    'pay-per-use',
    'multi-region',
    'vpc-support',
    'encryption',
    'monitoring',
    'api-access',
    'sdk-support',
  ];

  const pricingModels = [
    'pay-per-use',
    'subscription',
    'reserved',
    'free-tier',
  ];

  const maturityLevels = [
    'mature',
    'stable',
    'beta',
    'experimental',
  ];

  const handleClearFilters = () => {
    dispatch(clearFilters());
    onApplyFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.providers?.length) count += filters.providers.length;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.features?.length) count += filters.features.length;
    if (filters.pricingModel?.length) count += filters.pricingModel.length;
    if (filters.maturity?.length) count += filters.maturity.length;
    return count;
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Cloud Providers */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Cloud Provider</h4>
          <div className="space-y-2">
            {providers.map((provider) => (
              <label key={provider.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.providers?.includes(provider.id) || false}
                  onChange={() => dispatch(toggleProvider(provider.id))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{provider.displayName}</span>
                <span className="text-xs text-gray-500">({provider.serviceCount})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Service Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Service Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category.id) || false}
                  onChange={() => dispatch(toggleCategory(category.id))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-lg mr-1">{category.icon}</span>
                <span className="text-sm text-gray-700">{category.displayName}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
          <div className="space-y-2">
            {commonFeatures.map((feature) => (
              <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.features?.includes(feature) || false}
                  onChange={() => dispatch(toggleFeature(feature))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{feature.replace(/-/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pricing Model */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Pricing Model</h4>
          <div className="space-y-2">
            {pricingModels.map((model) => (
              <label key={model} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.pricingModel?.includes(model) || false}
                  onChange={() => dispatch(toggleFeature(model))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 capitalize">{model.replace(/-/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Maturity Level */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Maturity Level</h4>
          <div className="space-y-2">
            {maturityLevels.map((maturity) => (
              <label key={maturity} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.maturity?.includes(maturity) || false}
                  onChange={() => dispatch(toggleFeature(maturity))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 capitalize">{maturity}</span>
                <span className={clsx(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  maturity === 'mature' ? 'bg-green-100 text-green-800' :
                  maturity === 'stable' ? 'bg-blue-100 text-blue-800' :
                  maturity === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-orange-100 text-orange-800'
                )}>
                  {maturity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onApplyFilters}
            className="w-full btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;