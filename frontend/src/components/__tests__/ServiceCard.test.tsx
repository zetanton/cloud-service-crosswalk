import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ServiceCard from '../Services/ServiceCard';
import { CloudService } from '../../types';
import servicesReducer from '../../store/slices/servicesSlice';
import comparisonReducer from '../../store/slices/comparisonSlice';
import filtersReducer from '../../store/slices/filtersSlice';
import uiReducer from '../../store/slices/uiSlice';

const mockService: CloudService = {
  id: 'aws-lambda',
  name: 'AWS Lambda',
  displayName: 'Lambda',
  provider: 'aws',
  category: 'compute',
  subCategory: 'serverless',
  description: 'Serverless compute service for running code without managing servers',
  icon: '🚀',
  logo: '/assets/services/aws-lambda.svg',
  features: ['auto-scaling', 'pay-per-use', 'multiple-languages'],
  pricing: {
    model: 'pay-per-use',
    example: '$0.20 per 1M requests',
    currency: 'USD'
  },
  regions: ['us-east-1', 'us-west-2'],
  sla: { uptime: 99.95, description: '99.95% uptime SLA' },
  useCases: ['Event-driven applications'],
  limitations: ['15-minute execution timeout'],
  integrations: ['API Gateway'],
  sdk: ['Node.js', 'Python'],
  api: { rest: true, sdk: true, cli: true },
  maturity: 'mature',
  launchDate: '2014-11-13',
  lastUpdated: '2024-12-01'
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      services: servicesReducer,
      comparison: comparisonReducer,
      filters: filtersReducer,
      ui: uiReducer,
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ServiceCard', () => {
  test('renders service information correctly', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('Lambda')).toBeInTheDocument();
    expect(screen.getByText('AWS Lambda')).toBeInTheDocument();
    expect(screen.getByText('Serverless compute service for running code without managing servers')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  test('displays pricing information', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('$0.20 per 1M requests')).toBeInTheDocument();
  });

  test('shows features correctly', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('auto scaling')).toBeInTheDocument();
    expect(screen.getByText('pay per use')).toBeInTheDocument();
    expect(screen.getByText('multiple languages')).toBeInTheDocument();
  });

  test('displays maturity badge', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('mature')).toBeInTheDocument();
  });

  test('shows region count', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('2 regions')).toBeInTheDocument();
  });

  test('has working action buttons', () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('Compare')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});