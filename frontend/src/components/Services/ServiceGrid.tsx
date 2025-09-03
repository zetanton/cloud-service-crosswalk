import React from 'react';
import { CloudService } from '../../types';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';

interface ServiceGridProps {
  services: CloudService[];
  loading?: boolean;
  emptyMessage?: string;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  loading = false, 
  emptyMessage = 'No services found' 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {emptyMessage}. Try adjusting your search criteria or browse by category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;