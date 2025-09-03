import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChartBarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchServiceById } from '../store/slices/servicesSlice';
import { addServiceToComparison } from '../store/slices/comparisonSlice';
import ServiceCard from '../components/Services/ServiceCard';

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const dispatch = useAppDispatch();
  const { selectedService, loading, providers } = useAppSelector(state => state.services);
  const { selectedServices } = useAppSelector(state => state.comparison);

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [serviceId, dispatch]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
        <p className="text-gray-500 mb-6">The requested service could not be found.</p>
        <Link to="/services" className="btn-primary">
          Browse All Services
        </Link>
      </div>
    );
  }

  const provider = providers.find(p => p.id === selectedService.provider);
  const isInComparison = selectedServices.some(s => s.id === selectedService.id);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/services" className="hover:text-gray-700 flex items-center space-x-1">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Service Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{selectedService.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{selectedService.displayName}</h1>
            <p className="text-lg text-gray-600">{selectedService.name}</p>
            {provider && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-gray-500">by</span>
                <span className="font-medium text-gray-900">{provider.displayName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => dispatch(addServiceToComparison(selectedService))}
            disabled={isInComparison || selectedServices.length >= 5}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            {isInComparison ? 'In Comparison' : 'Add to Compare'}
          </button>
          <button className="btn-secondary">
            <HeartIcon className="h-4 w-4 mr-2" />
            Save
          </button>
          <button className="btn-secondary">
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {selectedService.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedService.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700">{feature.replace(/-/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h2>
            <ul className="space-y-2">
              {selectedService.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span className="text-gray-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Integrations</h2>
            <div className="flex flex-wrap gap-2">
              {selectedService.integrations.map((integration, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{selectedService.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sub-category</span>
                <span className="font-medium">{selectedService.subCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maturity</span>
                <span className="font-medium capitalize">{selectedService.maturity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Regions</span>
                <span className="font-medium">{selectedService.regions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SLA</span>
                <span className="font-medium">{selectedService.sla.uptime}%</span>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Model</span>
                <span className="font-medium capitalize">{selectedService.pricing.model}</span>
              </div>
              {selectedService.pricing.price && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">
                    {selectedService.pricing.currency || '$'}{selectedService.pricing.price} {selectedService.pricing.unit}
                  </span>
                </div>
              )}
              {selectedService.pricing.additionalCosts && (
                <div className="space-y-1">
                  <span className="text-gray-600 text-sm">Additional Costs:</span>
                  {selectedService.pricing.additionalCosts.map((cost, index) => (
                    <div key={index} className="text-sm text-gray-500 pl-2">
                      • {cost}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Limitations */}
          {selectedService.limitations.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Limitations</h3>
              <ul className="space-y-2">
                {selectedService.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span className="text-gray-700 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SDK Support */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SDK Support</h3>
            <div className="flex flex-wrap gap-2">
              {selectedService.sdk.map((language, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Equivalent Services */}
      {selectedService.equivalents && selectedService.equivalents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Equivalent Services</h2>
          <p className="text-gray-600">
            Similar services from other cloud providers that offer comparable functionality
          </p>
          {/* This would show equivalent services - would need additional API call */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for equivalent services */}
            <div className="card p-6 border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-center">
                Equivalent services will be loaded here
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;