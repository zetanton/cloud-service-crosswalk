import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setQuery, addRecentSearch } from '../../store/slices/filtersSlice';
import { searchServices } from '../../store/slices/servicesSlice';
import { getSearchSuggestions } from '../../services/api';
import clsx from 'clsx';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, recentSearches } = useAppSelector(state => state.filters);
  const [localQuery, setLocalQuery] = useState(filters.query || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalQuery(filters.query || '');
  }, [filters.query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (value: string) => {
    setLocalQuery(value);
    dispatch(setQuery(value));

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await getSearchSuggestions(value);
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query: string = localQuery) => {
    if (query.trim()) {
      dispatch(addRecentSearch(query));
      dispatch(searchServices({ ...filters, query }));
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const popularSearches = [
    'Lambda', 'Functions', 'Storage', 'Database', 'Kubernetes', 'AI/ML', 'Analytics', 'Security'
  ];

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for cloud services..."
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm placeholder-gray-500"
        />
        {localQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                <span>Searching...</span>
              </div>
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center space-x-2">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && suggestions.length === 0 && localQuery.length > 2 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No suggestions found for "{localQuery}"
            </div>
          )}

          {!loading && localQuery.length <= 2 && (
            <div className="py-2">
              {recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Recent Searches
                  </div>
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      <div className="flex items-center space-x-2">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        <span>{search}</span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Popular Searches
              </div>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-primary-500">#</span>
                    <span>{search}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;