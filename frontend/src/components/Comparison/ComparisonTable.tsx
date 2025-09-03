import React from 'react';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ServiceComparison } from '../../types';
import clsx from 'clsx';

interface ComparisonTableProps {
  comparison: ServiceComparison;
  loading: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ comparison, loading }) => {
  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded flex-1" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { services, featureMatrix } = comparison;

  const getFeatureIcon = (value: boolean | string) => {
    if (value === true) {
      return <CheckIcon className="h-4 w-4 text-green-600" />;
    } else if (value === false) {
      return <XMarkIcon className="h-4 w-4 text-red-500" />;
    } else if (typeof value === 'string' && value.includes('limited')) {
      return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />;
    } else {
      return <span className="text-xs text-gray-600">{value}</span>;
    }
  };

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'aws': return 'bg-aws-orange';
      case 'azure': return 'bg-azure-blue';
      case 'gcp': return 'bg-gcp-blue';
      case 'alibaba': return 'bg-alibaba-orange';
      case 'ibm': return 'bg-ibm-blue';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {services.map((service) => (
                <th key={service.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col items-center space-y-2">
                    <div className={clsx(
                      'w-3 h-3 rounded-full',
                      getProviderColor(service.provider)
                    )} />
                    <span>{service.displayName}</span>
                    <span className="text-xs text-gray-400 normal-case">
                      {service.provider.toUpperCase()}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Basic Info Section */}
            <tr className="bg-gray-50">
              <td colSpan={services.length + 1} className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Basic Information
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Description
              </td>
              {services.map((service) => (
                <td key={service.id} className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                  <div className="truncate" title={service.description}>
                    {service.description}
                  </div>
                </td>
              ))}
            </tr>

            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Category
              </td>
              {services.map((service) => (
                <td key={service.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    {service.category}
                  </span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Maturity
              </td>
              {services.map((service) => (
                <td key={service.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    service.maturity === 'mature' ? 'bg-green-100 text-green-800' :
                    service.maturity === 'stable' ? 'bg-blue-100 text-blue-800' :
                    service.maturity === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  )}>
                    {service.maturity}
                  </span>
                </td>
              ))}
            </tr>

            {/* Features Section */}
            <tr className="bg-gray-50">
              <td colSpan={services.length + 1} className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features Comparison
              </td>
            </tr>

            {featureMatrix.map((feature, index) => (
              <tr key={feature.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div>
                    {feature.name.replace(/-/g, ' ')}
                    {feature.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {feature.description}
                      </div>
                    )}
                  </div>
                </td>
                {services.map((service) => {
                  const value = feature[service.provider as keyof typeof feature] as boolean | string;
                  return (
                    <td key={service.id} className="px-6 py-4 text-center">
                      {getFeatureIcon(value)}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Pricing Section */}
            <tr className="bg-gray-50">
              <td colSpan={services.length + 1} className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing Information
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Pricing Model
              </td>
              {services.map((service) => (
                <td key={service.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  <span className="capitalize">{service.pricing.model}</span>
                </td>
              ))}
            </tr>

            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Starting Price
              </td>
              {services.map((service) => (
                <td key={service.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  {service.pricing.example || 
                   (service.pricing.price && service.pricing.unit ? 
                    `${service.pricing.currency || '$'}${service.pricing.price} ${service.pricing.unit}` : 
                    'Contact for pricing')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Gaps and Notes */}
      {comparison.gaps && comparison.gaps.length > 0 && (
        <div className="border-t border-gray-200 p-6 bg-yellow-50">
          <h3 className="text-sm font-medium text-yellow-800 mb-3">Service Gaps Identified</h3>
          <div className="space-y-2">
            {comparison.gaps.map((gap, index) => (
              <div key={index} className="text-sm text-yellow-700">
                <span className="font-medium">{gap.service}:</span> Missing in {gap.missingIn.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;