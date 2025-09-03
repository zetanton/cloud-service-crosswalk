// Provider constants
export const PROVIDERS = {
  AWS: 'aws',
  AZURE: 'azure',
  GCP: 'gcp',
  ALIBABA: 'alibaba',
  IBM: 'ibm'
} as const;

export const PROVIDER_COLORS = {
  [PROVIDERS.AWS]: {
    primary: '#FF9900',
    secondary: '#232F3E'
  },
  [PROVIDERS.AZURE]: {
    primary: '#0078D4',
    secondary: '#00A1F1'
  },
  [PROVIDERS.GCP]: {
    primary: '#4285F4',
    secondary: '#34A853'
  },
  [PROVIDERS.ALIBABA]: {
    primary: '#FF6A00',
    secondary: '#1890FF'
  },
  [PROVIDERS.IBM]: {
    primary: '#0062FF',
    secondary: '#0F62FE'
  }
};

// Category constants
export const CATEGORIES = {
  COMPUTE: 'compute',
  STORAGE: 'storage',
  DATABASE: 'database',
  NETWORKING: 'networking',
  AI_ML: 'ai-ml',
  ANALYTICS: 'analytics',
  SECURITY: 'security',
  DEVELOPER_TOOLS: 'developer-tools'
} as const;

export const CATEGORY_ICONS = {
  [CATEGORIES.COMPUTE]: '🖥️',
  [CATEGORIES.STORAGE]: '💾',
  [CATEGORIES.DATABASE]: '🗄️',
  [CATEGORIES.NETWORKING]: '🌐',
  [CATEGORIES.AI_ML]: '🤖',
  [CATEGORIES.ANALYTICS]: '📊',
  [CATEGORIES.SECURITY]: '🔒',
  [CATEGORIES.DEVELOPER_TOOLS]: '🛠️'
};

// Maturity levels
export const MATURITY_LEVELS = {
  EXPERIMENTAL: 'experimental',
  BETA: 'beta',
  STABLE: 'stable',
  MATURE: 'mature'
} as const;

// Pricing models
export const PRICING_MODELS = {
  PAY_PER_USE: 'pay-per-use',
  SUBSCRIPTION: 'subscription',
  RESERVED: 'reserved',
  FREE_TIER: 'free-tier',
  CONTACT: 'contact'
} as const;

// Service equivalence levels
export const EQUIVALENCE_LEVELS = {
  PRIMARY: 'primary',
  EQUIVALENT: 'equivalent',
  ALTERNATIVE: 'alternative',
  PARTIAL: 'partial'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  PROVIDERS: '/providers',
  CATEGORIES: '/categories',
  SERVICES: '/services',
  SEARCH: '/search'
} as const;