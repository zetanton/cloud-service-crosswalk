import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProviders } from '../../store/slices/servicesSlice';
import { setCurrentProvider } from '../../store/slices/uiSlice';
import { CloudProvider } from '../../types';
import clsx from 'clsx';

const ProviderTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { providers, loading } = useAppSelector(state => state.services);
  const { currentProvider } = useAppSelector(state => state.ui);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleProviderSelect = (providerId: string) => {
    dispatch(setCurrentProvider(providerId === currentProvider ? null : providerId));
  };

  const getProviderBadgeClass = (providerId: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer";
    
    switch (providerId) {
      case 'aws':
        return clsx(baseClasses, 'bg-aws-orange text-white hover:bg-orange-600');
      case 'azure':
        return clsx(baseClasses, 'bg-azure-blue text-white hover:bg-blue-600');
      case 'gcp':
        return clsx(baseClasses, 'bg-gcp-blue text-white hover:bg-blue-600');
      case 'alibaba':
        return clsx(baseClasses, 'bg-alibaba-orange text-white hover:bg-orange-600');
      case 'ibm':
        return clsx(baseClasses, 'bg-ibm-blue text-white hover:bg-blue-700');
      default:
        return clsx(baseClasses, 'bg-gray-200 text-gray-700 hover:bg-gray-300');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 py-3">
          {/* All Providers Tab */}
          <button
            onClick={() => handleProviderSelect('')}
            className={clsx(
              "inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
              currentProvider === null
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            All Providers
          </button>

          {/* Provider Tabs */}
          {providers.map((provider: CloudProvider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderSelect(provider.id)}
              className={clsx(
                getProviderBadgeClass(provider.id),
                currentProvider === provider.id && "ring-2 ring-white ring-opacity-60"
              )}
            >
              <span className="flex items-center space-x-2">
                <span>{provider.displayName}</span>
                <span className="text-xs opacity-75">({provider.serviceCount})</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderTabs;