import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  CloudIcon, 
  CpuChipIcon,
  CircleStackIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProviders, fetchCategories } from '../store/slices/servicesSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { providers, categories, loading } = useAppSelector(state => state.services);

  useEffect(() => {
    dispatch(fetchProviders());
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'compute': return CpuChipIcon;
      case 'storage': return CircleStackIcon;
      case 'database': return CircleStackIcon;
      case 'networking': return GlobeAltIcon;
      case 'security': return ShieldCheckIcon;
      case 'ai-ml': return BeakerIcon;
      case 'analytics': return ChartBarIcon;
      case 'developer-tools': return CpuChipIcon;
      default: return CloudIcon;
    }
  };

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'aws': return 'text-orange-600 bg-orange-50';
      case 'azure': return 'text-blue-600 bg-blue-50';
      case 'gcp': return 'text-blue-600 bg-blue-50';
      case 'alibaba': return 'text-orange-600 bg-orange-50';
      case 'ibm': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Perfect Cloud Service Match
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Compare services across AWS, Azure, GCP, Alibaba Cloud, and IBM to make informed decisions for your cloud strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-150"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Search Services
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              View Comparisons
            </Link>
          </div>
        </div>
      </div>

      {/* Provider Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cloud Providers</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-4" />
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {providers.map((provider) => (
              <Link
                key={provider.id}
                to={`/services?provider=${provider.id}`}
                className="card p-6 hover:shadow-card-hover transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getProviderColor(provider.id)}`}>
                  <span className="text-2xl font-bold">{provider.displayName.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {provider.displayName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {provider.serviceCount}+ services
                </p>
                <div className="text-xs text-gray-500">
                  Market Share: {provider.marketShare}%
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Service Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Categories</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card p-6">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.id);
              return (
                <Link
                  key={category.id}
                  to={`/services?category=${category.id}`}
                  className="card p-6 hover:shadow-card-hover transition-all duration-200 group"
                >
                  <IconComponent className="w-8 h-8 text-primary-600 mb-4 group-hover:text-primary-700 transition-colors" />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.displayName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">1000+</div>
            <div className="text-sm text-gray-600">Total Services</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">5</div>
            <div className="text-sm text-gray-600">Cloud Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Service Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;