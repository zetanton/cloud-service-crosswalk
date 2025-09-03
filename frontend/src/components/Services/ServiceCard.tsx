import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ChartBarIcon, 
  InformationCircleIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { CloudService } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addServiceToComparison, removeServiceFromComparison } from '../../store/slices/comparisonSlice';
import clsx from 'clsx';

interface ServiceCardProps {
  service: CloudService;
  showComparison?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, showComparison = true }) => {
  const dispatch = useAppDispatch();
  const { selectedServices } = useAppSelector(state => state.comparison);
  const isSelected = selectedServices.some(s => s.id === service.id);
  const canAddMore = selectedServices.length < 5;

  const getProviderBadgeClass = (providerId: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded text-xs font-medium";
    
    switch (providerId) {
      case 'aws':
        return clsx(baseClasses, 'bg-aws-orange text-white');
      case 'azure':
        return clsx(baseClasses, 'bg-azure-blue text-white');
      case 'gcp':
        return clsx(baseClasses, 'bg-gcp-blue text-white');
      case 'alibaba':
        return clsx(baseClasses, 'bg-alibaba-orange text-white');
      case 'ibm':
        return clsx(baseClasses, 'bg-ibm-blue text-white');
      default:
        return clsx(baseClasses, 'bg-gray-500 text-white');
    }
  };

  const getProviderDisplayName = (providerId: string) => {
    switch (providerId) {
      case 'aws': return 'AWS';
      case 'azure': return 'Azure';
      case 'gcp': return 'GCP';
      case 'alibaba': return 'Alibaba';
      case 'ibm': return 'IBM';
      default: return providerId.toUpperCase();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compute': return '🖥️';
      case 'storage': return '💾';
      case 'database': return '🗄️';
      case 'networking': return '🌐';
      case 'security': return '🔒';
      case 'ai-ml': return '🤖';
      case 'analytics': return '📊';
      case 'developer-tools': return '🛠️';
      default: return '📦';
    }
  };

  const handleComparisonToggle = () => {
    if (isSelected) {
      dispatch(removeServiceFromComparison(service.id));
    } else if (canAddMore) {
      dispatch(addServiceToComparison(service));
    }
  };

  const formatPricing = (pricing: typeof service.pricing) => {
    if (pricing.example) return pricing.example;
    if (pricing.price && pricing.unit) {
      return `${pricing.currency || '$'}${pricing.price} ${pricing.unit}`;
    }
    return pricing.model || 'Contact for pricing';
  };

  return (
    <div className="card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{service.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.displayName}</h3>
            <p className="text-sm text-gray-500">{service.name}</p>
          </div>
        </div>
        <span className={getProviderBadgeClass(service.provider)}>
          {getProviderDisplayName(service.provider)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 flex-grow">
        {service.description}
      </p>

      {/* Category Tags */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">{getCategoryIcon(service.category)}</span>
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            {service.category}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            {service.subCategory}
          </span>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-green-600">
              <CheckIcon className="h-3 w-3" />
              <span>{feature.replace(/-/g, ' ')}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <span className="text-xs text-gray-500">
              +{service.features.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Pricing</span>
          <span className="text-sm font-medium text-gray-900">
            💰 {formatPricing(service.pricing)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-auto">
        {showComparison && (
          <button
            onClick={handleComparisonToggle}
            disabled={!canAddMore && !isSelected}
            className={clsx(
              'flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150',
              isSelected
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : canAddMore
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            )}
          >
            <ChartBarIcon className="h-4 w-4" />
            <span>{isSelected ? 'Remove' : 'Compare'}</span>
          </button>
        )}
        
        <Link
          to={`/services/${service.id}`}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-150"
        >
          <InformationCircleIcon className="h-4 w-4" />
          <span>Details</span>
        </Link>

        <button className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors duration-150">
          <HeartIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Maturity Badge */}
      <div className="mt-3 flex items-center justify-between">
        <span className={clsx(
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          service.maturity === 'mature' ? 'bg-green-100 text-green-800' :
          service.maturity === 'stable' ? 'bg-blue-100 text-blue-800' :
          service.maturity === 'beta' ? 'bg-yellow-100 text-yellow-800' :
          service.maturity === 'experimental' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {service.maturity}
        </span>
        
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <span>🌍</span>
          <span>{service.regions.length} regions</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;