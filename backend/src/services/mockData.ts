import { CloudProvider, ServiceCategory, CloudService } from '../types';

export const mockProviders: CloudProvider[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    displayName: 'AWS',
    logo: '/assets/logos/aws.svg',
    primaryColor: '#FF9900',
    secondaryColor: '#232F3E',
    website: 'https://aws.amazon.com',
    description: 'Leading cloud computing platform with comprehensive service offerings',
    serviceCount: 200,
    marketShare: 32.0,
    founded: 2006,
    headquarters: 'Seattle, WA, USA'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    displayName: 'Azure',
    logo: '/assets/logos/azure.svg',
    primaryColor: '#0078D4',
    secondaryColor: '#00A1F1',
    website: 'https://azure.microsoft.com',
    description: 'Microsoft\'s cloud computing platform with strong enterprise integration',
    serviceCount: 180,
    marketShare: 23.0,
    founded: 2010,
    headquarters: 'Redmond, WA, USA'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    displayName: 'GCP',
    logo: '/assets/logos/gcp.svg',
    primaryColor: '#4285F4',
    secondaryColor: '#34A853',
    website: 'https://cloud.google.com',
    description: 'Google\'s cloud platform with strong AI/ML and data analytics capabilities',
    serviceCount: 150,
    marketShare: 11.0,
    founded: 2008,
    headquarters: 'Mountain View, CA, USA'
  },
  {
    id: 'alibaba',
    name: 'Alibaba Cloud',
    displayName: 'Alibaba',
    logo: '/assets/logos/alibaba.svg',
    primaryColor: '#FF6A00',
    secondaryColor: '#1890FF',
    website: 'https://www.alibabacloud.com',
    description: 'Leading cloud provider in Asia-Pacific with strong presence in China',
    serviceCount: 120,
    marketShare: 9.0,
    founded: 2009,
    headquarters: 'Hangzhou, China'
  },
  {
    id: 'ibm',
    name: 'IBM Cloud',
    displayName: 'IBM',
    logo: '/assets/logos/ibm.svg',
    primaryColor: '#0062FF',
    secondaryColor: '#0F62FE',
    website: 'https://www.ibm.com/cloud',
    description: 'Enterprise-focused cloud platform with strong hybrid and AI capabilities',
    serviceCount: 100,
    marketShare: 4.0,
    founded: 2013,
    headquarters: 'Armonk, NY, USA'
  }
];

export const mockCategories: ServiceCategory[] = [
  {
    id: 'compute',
    name: 'Compute',
    displayName: 'Compute Services',
    icon: '🖥️',
    description: 'Virtual machines, containers, and serverless computing services',
    sortOrder: 1
  },
  {
    id: 'storage',
    name: 'Storage',
    displayName: 'Storage Services',
    icon: '💾',
    description: 'Object storage, block storage, file storage, and backup services',
    sortOrder: 2
  },
  {
    id: 'database',
    name: 'Database',
    displayName: 'Database Services',
    icon: '🗄️',
    description: 'Relational, NoSQL, data warehousing, and caching services',
    sortOrder: 3
  },
  {
    id: 'networking',
    name: 'Networking',
    displayName: 'Networking Services',
    icon: '🌐',
    description: 'Load balancing, CDN, VPN, DNS, and security services',
    sortOrder: 4
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    displayName: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Machine learning, natural language processing, and computer vision',
    sortOrder: 5
  },
  {
    id: 'analytics',
    name: 'Analytics',
    displayName: 'Analytics Services',
    icon: '📊',
    description: 'Big data, streaming, and business intelligence services',
    sortOrder: 6
  },
  {
    id: 'security',
    name: 'Security',
    displayName: 'Security Services',
    icon: '🔒',
    description: 'Identity management, encryption, and threat detection services',
    sortOrder: 7
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    displayName: 'Developer Tools',
    icon: '🛠️',
    description: 'CI/CD, monitoring, logging, and testing services',
    sortOrder: 8
  }
];

export const mockServices: CloudService[] = [
  // AWS Services
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    displayName: 'Lambda',
    provider: 'aws',
    category: 'compute',
    subCategory: 'serverless',
    description: 'Serverless compute service for running code without managing servers',
    longDescription: 'AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you.',
    icon: '🚀',
    logo: '/assets/services/aws-lambda.svg',
    features: ['auto-scaling', 'pay-per-use', 'multiple-languages', 'event-triggers', 'vpc-support', 'custom-runtimes'],
    pricing: {
      model: 'pay-per-use',
      unit: 'per 1M requests',
      price: 0.20,
      currency: 'USD',
      example: '$0.20 per 1M requests',
      additionalCosts: ['Compute time: $0.0000166667 per GB-second']
    },
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    useCases: ['Event-driven applications', 'Data processing', 'Real-time file processing', 'IoT backends'],
    limitations: ['15-minute execution timeout', '512MB to 10GB memory limit', '1000 concurrent executions by default'],
    integrations: ['API Gateway', 'S3', 'DynamoDB', 'CloudWatch'],
    sdk: ['Node.js', 'Python', 'Java', 'Go', 'C#', 'Ruby'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2014-11-13',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'aws-ec2',
    name: 'Amazon EC2',
    displayName: 'EC2',
    provider: 'aws',
    category: 'compute',
    subCategory: 'virtual-machines',
    description: 'Scalable virtual machines in the cloud',
    icon: '💻',
    logo: '/assets/services/aws-ec2.svg',
    features: ['on-demand-instances', 'reserved-instances', 'spot-instances', 'auto-scaling', 'load-balancing', 'multiple-instance-types'],
    pricing: {
      model: 'pay-per-use',
      example: 't3.micro: $0.0104 per hour',
      currency: 'USD'
    },
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    sla: { uptime: 99.99, description: '99.99% uptime SLA' },
    useCases: ['Web applications', 'Development environments', 'Batch processing', 'High-performance computing'],
    limitations: ['Instance limits per region', 'EBS volume limits'],
    integrations: ['EBS', 'VPC', 'Auto Scaling', 'Load Balancer'],
    sdk: ['AWS CLI', 'AWS SDKs for all languages'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2006-08-24',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'aws-s3',
    name: 'Amazon S3',
    displayName: 'S3',
    provider: 'aws',
    category: 'storage',
    subCategory: 'object-storage',
    description: 'Scalable object storage for data lakes and applications',
    icon: '🪣',
    logo: '/assets/services/aws-s3.svg',
    features: ['unlimited-storage', '99.999999999% durability', 'versioning', 'lifecycle-management', 'encryption', 'access-control'],
    pricing: {
      model: 'pay-per-use',
      price: 0.023,
      unit: 'per GB per month',
      currency: 'USD'
    },
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    sla: { uptime: 99.99, description: '99.99% uptime SLA' },
    useCases: ['Data lakes', 'Backup and restore', 'Content distribution', 'Static website hosting'],
    limitations: ['100 bucket limit by default', 'Object size limit of 5TB'],
    integrations: ['CloudFront', 'Lambda', 'Athena', 'Glue'],
    sdk: ['All major languages'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2006-03-14',
    lastUpdated: '2024-12-01'
  },
  // Azure Services
  {
    id: 'azure-functions',
    name: 'Azure Functions',
    displayName: 'Functions',
    provider: 'azure',
    category: 'compute',
    subCategory: 'serverless',
    description: 'Event-driven serverless compute platform',
    longDescription: 'Azure Functions is a serverless solution that allows you to write less code, maintain less infrastructure, and save on costs.',
    icon: '🚀',
    logo: '/assets/services/azure-functions.svg',
    features: ['auto-scaling', 'pay-per-use', 'multiple-languages', 'event-triggers', 'vpc-support', 'durable-functions'],
    pricing: {
      model: 'pay-per-use',
      unit: 'per 1M executions',
      price: 0.20,
      currency: 'USD'
    },
    regions: ['East US', 'West US 2', 'West Europe', 'Southeast Asia'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    useCases: ['HTTP APIs', 'Event processing', 'Scheduled tasks', 'Real-time data processing'],
    limitations: ['10-minute execution timeout', '1.5GB memory limit', 'Limited custom runtime support'],
    integrations: ['Event Grid', 'Blob Storage', 'Cosmos DB', 'Application Insights'],
    sdk: ['C#', 'JavaScript', 'Python', 'Java', 'PowerShell'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2016-03-31',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'azure-vm',
    name: 'Azure Virtual Machines',
    displayName: 'Virtual Machines',
    provider: 'azure',
    category: 'compute',
    subCategory: 'virtual-machines',
    description: 'On-demand, scalable computing resources',
    icon: '💻',
    logo: '/assets/services/azure-vm.svg',
    features: ['multiple-sizes', 'windows-linux', 'hybrid-connectivity', 'auto-scaling', 'managed-disks'],
    pricing: {
      model: 'pay-per-use',
      example: 'B1s: $0.0104 per hour',
      currency: 'USD'
    },
    regions: ['East US', 'West US 2', 'West Europe', 'Southeast Asia'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    useCases: ['Enterprise applications', 'Development and testing', 'Backup and disaster recovery'],
    limitations: ['Regional quotas', 'Instance family limits'],
    integrations: ['Azure Storage', 'Virtual Network', 'Load Balancer'],
    sdk: ['Azure CLI', 'PowerShell', 'REST API'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2013-04-16',
    lastUpdated: '2024-12-01'
  },
  // GCP Services
  {
    id: 'gcp-cloud-functions',
    name: 'Google Cloud Functions',
    displayName: 'Cloud Functions',
    provider: 'gcp',
    category: 'compute',
    subCategory: 'serverless',
    description: 'Serverless execution environment for building and connecting cloud services',
    icon: '🚀',
    logo: '/assets/services/gcp-functions.svg',
    features: ['auto-scaling', 'pay-per-use', 'multiple-languages', 'event-triggers', 'cold-start-optimization'],
    pricing: {
      model: 'pay-per-use',
      unit: 'per 1M invocations',
      price: 0.40,
      currency: 'USD'
    },
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    useCases: ['HTTP functions', 'Background functions', 'Cloud event processing'],
    limitations: ['9-minute execution timeout', '8GB memory limit', 'Limited VPC support'],
    integrations: ['Pub/Sub', 'Cloud Storage', 'Firestore', 'Cloud Monitoring'],
    sdk: ['Node.js', 'Python', 'Go', 'Java'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2016-02-09',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'gcp-compute-engine',
    name: 'Google Compute Engine',
    displayName: 'Compute Engine',
    provider: 'gcp',
    category: 'compute',
    subCategory: 'virtual-machines',
    description: 'Scalable, high-performance virtual machines',
    icon: '💻',
    logo: '/assets/services/gcp-compute.svg',
    features: ['custom-machine-types', 'preemptible-instances', 'live-migration', 'persistent-disks'],
    pricing: {
      model: 'pay-per-use',
      example: 'n1-standard-1: $0.0475 per hour',
      currency: 'USD'
    },
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    useCases: ['General purpose workloads', 'High-performance computing', 'Machine learning'],
    limitations: ['Regional quotas', 'Instance group limits'],
    integrations: ['Cloud Storage', 'VPC', 'Load Balancing'],
    sdk: ['gcloud CLI', 'Client libraries'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launchDate: '2012-06-28',
    lastUpdated: '2024-12-01'
  }
];

// Mock data service functions
export function getMockProviders(): CloudProvider[] {
  return mockProviders;
}

export function getMockProvider(id: string): CloudProvider | null {
  return mockProviders.find(p => p.id === id) || null;
}

export function getMockCategories(): ServiceCategory[] {
  return mockCategories;
}

export function getMockCategory(id: string): ServiceCategory | null {
  return mockCategories.find(c => c.id === id) || null;
}

export function getMockServices(): CloudService[] {
  return mockServices;
}

export function getMockService(id: string): CloudService | null {
  return mockServices.find(s => s.id === id) || null;
}

export function searchMockServices(filters: any): any {
  let filteredServices = [...mockServices];

  // Apply query filter
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredServices = filteredServices.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.displayName.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );
  }

  // Apply provider filter
  if (filters.providers?.length) {
    filteredServices = filteredServices.filter(service => 
      filters.providers.includes(service.provider)
    );
  }

  // Apply category filter
  if (filters.categories?.length) {
    filteredServices = filteredServices.filter(service => 
      filters.categories.includes(service.category)
    );
  }

  // Apply features filter
  if (filters.features?.length) {
    filteredServices = filteredServices.filter(service => 
      filters.features.some((feature: string) => service.features.includes(feature))
    );
  }

  const total = filteredServices.length;
  const limit = filters.limit || 20;
  const offset = filters.offset || 0;
  
  const paginatedServices = filteredServices.slice(offset, offset + limit);

  return {
    services: paginatedServices,
    total,
    hasMore: (offset + limit) < total,
    filters: {
      providers: mockProviders.map(p => ({ id: p.id, count: mockServices.filter(s => s.provider === p.id).length })),
      categories: mockCategories.map(c => ({ id: c.id, count: mockServices.filter(s => s.category === c.id).length })),
      features: [],
      maturity: []
    }
  };
}