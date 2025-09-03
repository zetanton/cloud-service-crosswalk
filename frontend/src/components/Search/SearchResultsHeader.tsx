import React from 'react';
import { AdjustmentsHorizontalIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { SearchResult } from '../../types';

interface SearchResultsHeaderProps {
  results: SearchResult | null;
  loading: boolean;
  onSearch: () => void;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ 
  results, 
  loading, 
  onSearch 
}) => {
  const formatResultsText = () => {
    if (!results) return '';
    
    const { services, total, hasMore } = results;
    const showing = services.length;
    
    if (hasMore) {
      return `Showing ${showing} of ${total}+ services`;
    } else {
      return `Showing ${showing} of ${total} services`;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="flex items-center space-x-2">
            <ArrowPathIcon className="h-4 w-4 text-primary-600 animate-spin" />
            <span className="text-sm text-gray-600">Searching...</span>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            {results && formatResultsText()}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
        {/* Refresh Button */}
        <button
          onClick={onSearch}
          disabled={loading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>

        {/* Sort Options */}
        <select className="border border-gray-300 rounded-md text-sm py-2 px-3 bg-white focus:ring-primary-500 focus:border-primary-500">
          <option value="relevance">Sort by Relevance</option>
          <option value="name">Sort by Name</option>
          <option value="provider">Sort by Provider</option>
          <option value="category">Sort by Category</option>
          <option value="updated">Sort by Last Updated</option>
        </select>
      </div>
    </div>
  );
};

export default SearchResultsHeader;