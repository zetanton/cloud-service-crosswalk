import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_API_BASE_URL = 'http://localhost:3001/api/v1';

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock intersection observer
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));