import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setMobileMenuOpen } from '../../store/slices/uiSlice';
import SearchBar from '../Search/SearchBar';
import ProviderTabs from './ProviderTabs';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mobileMenuOpen } = useAppSelector(state => state.ui);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMobileMenu = () => {
    dispatch(setMobileMenuOpen(!mobileMenuOpen));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🚀</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Cloud Service Crosswalk</h1>
                <p className="text-xs text-gray-500">Compare cloud services across providers</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">Cloud Crosswalk</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center space-x-3">
              <button className="btn-secondary">
                Sign In
              </button>
              <button className="btn-primary">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Provider Tabs */}
      <ProviderTabs />
    </header>
  );
};

export default Header;