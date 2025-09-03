// Provider types
export interface CloudProvider {
  id: string;
  name: string;
  displayName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  website: string;
  description: string;
  serviceCount: number;
  marketShare: number;
  founded: number;
  headquarters: string;
}

// Category types
export interface ServiceCategory {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  parentCategory?: string;
  subCategories?: string[];
  sortOrder: number;
}

// Service types
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

// Service mapping types
export interface ServiceMapping {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  services: ServiceMappingItem[];
  commonFeatures: string[];
  differentiatingFeatures: Record<string, string[]>;
}

export interface ServiceMappingItem {
  provider: string;
  serviceId: string;
  equivalence: 'primary' | 'equivalent' | 'alternative' | 'partial';
  featureParity: number;
  notes: string;
}

// Feature comparison types
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

// Search types
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

// Comparison types
export interface ServiceComparison {
  services: CloudService[];
  featureMatrix: FeatureComparison[];
  gaps: ServiceGap[];
  recommendations: ServiceRecommendation[];
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

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

// Database row types
export interface ProviderRow {
  id: string;
  name: string;
  display_name: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  website: string;
  description: string;
  service_count: number;
  market_share: number;
  founded: number;
  headquarters: string;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryRow {
  id: string;
  name: string;
  display_name: string;
  icon: string;
  description: string;
  parent_category: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ServiceRow {
  id: string;
  name: string;
  display_name: string;
  provider_id: string;
  category_id: string;
  sub_category: string | null;
  description: string;
  long_description: string | null;
  icon: string;
  logo: string;
  features: string[];
  pricing: any;
  regions: string[];
  sla: any;
  use_cases: string[];
  limitations: string[];
  integrations: string[];
  sdk: string[];
  api: any;
  maturity: string;
  launch_date: Date | null;
  last_updated: Date;
  created_at: Date;
  updated_at: Date;
}