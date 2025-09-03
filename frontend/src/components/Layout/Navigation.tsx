import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  BookOpenIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const Navigation: React.FC = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Services', href: '/services', icon: MagnifyingGlassIcon },
    { name: 'Compare', href: '/compare', icon: ChartBarIcon },
    { name: 'Resources', href: '/resources', icon: BookOpenIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap',
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;