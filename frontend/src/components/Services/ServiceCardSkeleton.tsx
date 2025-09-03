import React from 'react';

const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="card p-6 h-full">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          <div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Description Skeleton */}
      <div className="mb-4">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-3/5 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Category Tags Skeleton */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="flex space-x-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Features Skeleton */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Skeleton */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex space-x-2 mt-auto">
        <div className="flex-1 h-9 bg-gray-200 rounded-md animate-pulse" />
        <div className="flex-1 h-9 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-9 h-9 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Bottom Badge Skeleton */}
      <div className="mt-3 flex items-center justify-between">
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;