export interface CloudService {
  id: string;
  name: string;
  displayName: string;
  provider: string;
  category: string;
  subCategory?: string;
  description: string;
  longDescription?: string;
  icon: string;
  logo: string;
  features: string[];
  pricing: {
    model: string;
    price?: number;
    unit?: string;
    currency?: string;
    example?: string;
    additionalCosts?: string[];
  };
  regions: string[];
  sla: {
    uptime: number;
    description: string;
  };
  useCases: string[];
  limitations: string[];
  integrations: string[];
  sdk: string[];
  api: {
    rest: boolean;
    sdk: boolean;
    cli: boolean;
  };
  maturity: 'experimental' | 'beta' | 'stable' | 'mature';
  launchDate: string;
  lastUpdated: string;
}

export interface SearchFilters {
  query?: string;
  providers?: string[];
  categories?: string[];
  subCategories?: string[];
  features?: string[];
  pricingModel?: string[];
  maturity?: string[];
  regions?: string[];
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  services: CloudService[];
  total: number;
  hasMore: boolean;
  filters: {
    providers: { id: string; count: number }[];
    categories: { id: string; count: number }[];
    features: { name: string; count: number }[];
    maturity: { level: string; count: number }[];
  };
}

export interface ServiceComparison {
  services: CloudService[];
  featureMatrix: FeatureComparison[];
  gaps: ServiceGap[];
  recommendations: ServiceRecommendation[];
}

export interface FeatureComparison {
  name: string;
  description: string;
  aws: boolean;
  azure: boolean;
  gcp: boolean;
  alibaba: boolean;
  ibm: boolean;
  notes?: string;
}

export interface ServiceGap {
  category: string;
  service: string;
  availableIn: string[];
  missingIn: string[];
  alternatives: {
    provider: string;
    service: string;
    capability: string;
  }[];
  impact: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface ServiceRecommendation {
  type: 'alternative' | 'complement' | 'upgrade';
  service: CloudService;
  reason: string;
  confidence: number;
}