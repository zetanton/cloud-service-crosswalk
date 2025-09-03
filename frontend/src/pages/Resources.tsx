import React from 'react';
import { BookOpenIcon, DocumentTextIcon, VideoCameraIcon, LinkIcon } from '@heroicons/react/24/outline';

const Resources: React.FC = () => {
  const resourceCategories = [
    {
      title: 'Documentation',
      icon: DocumentTextIcon,
      items: [
        { title: 'Getting Started Guide', description: 'Learn how to use the crosswalk tool effectively' },
        { title: 'API Documentation', description: 'Complete API reference and examples' },
        { title: 'Data Sources', description: 'Information about our data collection and validation process' },
      ]
    },
    {
      title: 'Tutorials',
      icon: VideoCameraIcon,
      items: [
        { title: 'Service Comparison Tutorial', description: 'Step-by-step guide to comparing cloud services' },
        { title: 'Migration Planning', description: 'How to plan cloud migrations using service mappings' },
        { title: 'Multi-Cloud Strategy', description: 'Building effective multi-cloud architectures' },
      ]
    },
    {
      title: 'External Links',
      icon: LinkIcon,
      items: [
        { title: 'AWS Documentation', description: 'Official AWS service documentation' },
        { title: 'Azure Documentation', description: 'Microsoft Azure service reference' },
        { title: 'GCP Documentation', description: 'Google Cloud Platform documentation' },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600 mt-2">
          Documentation, tutorials, and helpful links for cloud service comparison and migration planning
        </p>
      </div>

      {/* Resource Categories */}
      <div className="space-y-8">
        {resourceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center space-x-3 mb-6">
              <category.icon className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="card p-6 hover:shadow-card-hover transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                    <span>Learn more</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <BookOpenIcon className="h-5 w-5" />
            <span>User Guide</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <DocumentTextIcon className="h-5 w-5" />
            <span>API Docs</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <VideoCameraIcon className="h-5 w-5" />
            <span>Video Tutorials</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <LinkIcon className="h-5 w-5" />
            <span>Community</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;