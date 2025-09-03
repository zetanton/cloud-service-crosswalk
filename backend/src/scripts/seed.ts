import { connectDatabase, query } from '../config/database';

// Provider seed data
const providers = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    display_name: 'AWS',
    logo: '/assets/logos/aws.svg',
    primary_color: '#FF9900',
    secondary_color: '#232F3E',
    website: 'https://aws.amazon.com',
    description: 'Leading cloud computing platform with comprehensive service offerings',
    service_count: 200,
    market_share: 32.0,
    founded: 2006,
    headquarters: 'Seattle, WA, USA'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    display_name: 'Azure',
    logo: '/assets/logos/azure.svg',
    primary_color: '#0078D4',
    secondary_color: '#00A1F1',
    website: 'https://azure.microsoft.com',
    description: 'Microsoft\'s cloud computing platform with strong enterprise integration',
    service_count: 180,
    market_share: 23.0,
    founded: 2010,
    headquarters: 'Redmond, WA, USA'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    display_name: 'GCP',
    logo: '/assets/logos/gcp.svg',
    primary_color: '#4285F4',
    secondary_color: '#34A853',
    website: 'https://cloud.google.com',
    description: 'Google\'s cloud platform with strong AI/ML and data analytics capabilities',
    service_count: 150,
    market_share: 11.0,
    founded: 2008,
    headquarters: 'Mountain View, CA, USA'
  },
  {
    id: 'alibaba',
    name: 'Alibaba Cloud',
    display_name: 'Alibaba',
    logo: '/assets/logos/alibaba.svg',
    primary_color: '#FF6A00',
    secondary_color: '#1890FF',
    website: 'https://www.alibabacloud.com',
    description: 'Leading cloud provider in Asia-Pacific with strong presence in China',
    service_count: 120,
    market_share: 9.0,
    founded: 2009,
    headquarters: 'Hangzhou, China'
  },
  {
    id: 'ibm',
    name: 'IBM Cloud',
    display_name: 'IBM',
    logo: '/assets/logos/ibm.svg',
    primary_color: '#0062FF',
    secondary_color: '#0F62FE',
    website: 'https://www.ibm.com/cloud',
    description: 'Enterprise-focused cloud platform with strong hybrid and AI capabilities',
    service_count: 100,
    market_share: 4.0,
    founded: 2013,
    headquarters: 'Armonk, NY, USA'
  }
];

// Category seed data
const categories = [
  {
    id: 'compute',
    name: 'Compute',
    display_name: 'Compute Services',
    icon: '🖥️',
    description: 'Virtual machines, containers, and serverless computing services',
    sort_order: 1
  },
  {
    id: 'storage',
    name: 'Storage',
    display_name: 'Storage Services',
    icon: '💾',
    description: 'Object storage, block storage, file storage, and backup services',
    sort_order: 2
  },
  {
    id: 'database',
    name: 'Database',
    display_name: 'Database Services',
    icon: '🗄️',
    description: 'Relational, NoSQL, data warehousing, and caching services',
    sort_order: 3
  },
  {
    id: 'networking',
    name: 'Networking',
    display_name: 'Networking Services',
    icon: '🌐',
    description: 'Load balancing, CDN, VPN, DNS, and security services',
    sort_order: 4
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    display_name: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Machine learning, natural language processing, and computer vision',
    sort_order: 5
  },
  {
    id: 'analytics',
    name: 'Analytics',
    display_name: 'Analytics Services',
    icon: '📊',
    description: 'Big data, streaming, and business intelligence services',
    sort_order: 6
  },
  {
    id: 'security',
    name: 'Security',
    display_name: 'Security Services',
    icon: '🔒',
    description: 'Identity management, encryption, and threat detection services',
    sort_order: 7
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    display_name: 'Developer Tools',
    icon: '🛠️',
    description: 'CI/CD, monitoring, logging, and testing services',
    sort_order: 8
  }
];

// Sample services seed data
const services = [
  // AWS Lambda
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    display_name: 'Lambda',
    provider_id: 'aws',
    category_id: 'compute',
    sub_category: 'serverless',
    description: 'Serverless compute service for running code without managing servers',
    long_description: 'AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you.',
    icon: '🚀',
    logo: '/assets/services/aws-lambda.svg',
    features: ['auto-scaling', 'pay-per-use', 'multiple-languages', 'event-triggers', 'vpc-support', 'custom-runtimes'],
    pricing: {
      model: 'pay-per-use',
      unit: 'per 1M requests',
      price: 0.20,
      currency: 'USD',
      additionalCosts: ['Compute time: $0.0000166667 per GB-second']
    },
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    sla: { uptime: 99.95, description: '99.95% uptime SLA' },
    use_cases: ['Event-driven applications', 'Data processing', 'Real-time file processing', 'IoT backends'],
    limitations: ['15-minute execution timeout', '512MB to 10GB memory limit', '1000 concurrent executions by default'],
    integrations: ['API Gateway', 'S3', 'DynamoDB', 'CloudWatch'],
    sdk: ['Node.js', 'Python', 'Java', 'Go', 'C#', 'Ruby'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launch_date: '2014-11-13'
  },
  // Azure Functions
  {
    id: 'azure-functions',
    name: 'Azure Functions',
    display_name: 'Functions',
    provider_id: 'azure',
    category_id: 'compute',
    sub_category: 'serverless',
    description: 'Event-driven serverless compute platform',
    long_description: 'Azure Functions is a serverless solution that allows you to write less code, maintain less infrastructure, and save on costs.',
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
    use_cases: ['HTTP APIs', 'Event processing', 'Scheduled tasks', 'Real-time data processing'],
    limitations: ['10-minute execution timeout', '1.5GB memory limit', 'Limited custom runtime support'],
    integrations: ['Event Grid', 'Blob Storage', 'Cosmos DB', 'Application Insights'],
    sdk: ['C#', 'JavaScript', 'Python', 'Java', 'PowerShell'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launch_date: '2016-03-31'
  },
  // GCP Cloud Functions
  {
    id: 'gcp-cloud-functions',
    name: 'Google Cloud Functions',
    display_name: 'Cloud Functions',
    provider_id: 'gcp',
    category_id: 'compute',
    sub_category: 'serverless',
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
    use_cases: ['HTTP functions', 'Background functions', 'Cloud event processing'],
    limitations: ['9-minute execution timeout', '8GB memory limit', 'Limited VPC support'],
    integrations: ['Pub/Sub', 'Cloud Storage', 'Firestore', 'Cloud Monitoring'],
    sdk: ['Node.js', 'Python', 'Go', 'Java'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launch_date: '2016-02-09'
  },
  // AWS S3
  {
    id: 'aws-s3',
    name: 'Amazon S3',
    display_name: 'S3',
    provider_id: 'aws',
    category_id: 'storage',
    sub_category: 'object-storage',
    description: 'Scalable object storage for data lakes and applications',
    icon: '💾',
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
    use_cases: ['Data lakes', 'Backup and restore', 'Content distribution', 'Static website hosting'],
    limitations: ['100 bucket limit by default', 'Object size limit of 5TB'],
    integrations: ['CloudFront', 'Lambda', 'Athena', 'Glue'],
    sdk: ['All major languages'],
    api: { rest: true, sdk: true, cli: true },
    maturity: 'mature',
    launch_date: '2006-03-14'
  }
];

async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('🌱 Seeding database...');

    // Seed providers
    console.log('📦 Seeding providers...');
    for (const provider of providers) {
      await query(`
        INSERT INTO providers (
          id, name, display_name, logo, primary_color, secondary_color,
          website, description, service_count, market_share, founded, headquarters
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          display_name = EXCLUDED.display_name,
          logo = EXCLUDED.logo,
          primary_color = EXCLUDED.primary_color,
          secondary_color = EXCLUDED.secondary_color,
          website = EXCLUDED.website,
          description = EXCLUDED.description,
          service_count = EXCLUDED.service_count,
          market_share = EXCLUDED.market_share,
          founded = EXCLUDED.founded,
          headquarters = EXCLUDED.headquarters,
          updated_at = CURRENT_TIMESTAMP
      `, [
        provider.id, provider.name, provider.display_name, provider.logo,
        provider.primary_color, provider.secondary_color, provider.website,
        provider.description, provider.service_count, provider.market_share,
        provider.founded, provider.headquarters
      ]);
    }

    // Seed categories
    console.log('📂 Seeding categories...');
    for (const category of categories) {
      await query(`
        INSERT INTO categories (
          id, name, display_name, icon, description, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          display_name = EXCLUDED.display_name,
          icon = EXCLUDED.icon,
          description = EXCLUDED.description,
          sort_order = EXCLUDED.sort_order,
          updated_at = CURRENT_TIMESTAMP
      `, [
        category.id, category.name, category.display_name,
        category.icon, category.description, category.sort_order
      ]);
    }

    // Seed services
    console.log('🛠️ Seeding services...');
    for (const service of services) {
      await query(`
        INSERT INTO services (
          id, name, display_name, provider_id, category_id, sub_category,
          description, long_description, icon, logo, features, pricing,
          regions, sla, use_cases, limitations, integrations, sdk, api,
          maturity, launch_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          display_name = EXCLUDED.display_name,
          provider_id = EXCLUDED.provider_id,
          category_id = EXCLUDED.category_id,
          sub_category = EXCLUDED.sub_category,
          description = EXCLUDED.description,
          long_description = EXCLUDED.long_description,
          icon = EXCLUDED.icon,
          logo = EXCLUDED.logo,
          features = EXCLUDED.features,
          pricing = EXCLUDED.pricing,
          regions = EXCLUDED.regions,
          sla = EXCLUDED.sla,
          use_cases = EXCLUDED.use_cases,
          limitations = EXCLUDED.limitations,
          integrations = EXCLUDED.integrations,
          sdk = EXCLUDED.sdk,
          api = EXCLUDED.api,
          maturity = EXCLUDED.maturity,
          launch_date = EXCLUDED.launch_date,
          updated_at = CURRENT_TIMESTAMP
      `, [
        service.id, service.name, service.display_name, service.provider_id,
        service.category_id, service.sub_category, service.description,
        service.long_description, service.icon, service.logo,
        JSON.stringify(service.features), JSON.stringify(service.pricing),
        JSON.stringify(service.regions), JSON.stringify(service.sla),
        JSON.stringify(service.use_cases), JSON.stringify(service.limitations),
        JSON.stringify(service.integrations), JSON.stringify(service.sdk),
        JSON.stringify(service.api), service.maturity, service.launch_date
      ]);
    }

    // Create sample service mapping
    console.log('🔗 Creating service mappings...');
    const mappingResult = await query(`
      INSERT INTO service_mappings (
        name, category_id, sub_category, description, common_features, differentiating_features
      ) VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
      RETURNING id
    `, [
      'Serverless Compute Services',
      'compute',
      'serverless',
      'Function-as-a-Service offerings across cloud providers',
      JSON.stringify(['auto-scaling', 'pay-per-use', 'event-triggers', 'multiple-languages']),
      JSON.stringify({
        aws: ['custom-runtimes', 'vpc-support', 'largest-ecosystem'],
        azure: ['microsoft-integration', 'durable-functions', 'enterprise-tools'],
        gcp: ['cold-start-optimization', 'cloud-native-integration'],
        alibaba: ['asia-pacific-presence', 'cost-optimization'],
        ibm: ['enterprise-security', 'hybrid-cloud-support']
      })
    ]);

    if (mappingResult.length > 0) {
      const mappingId = mappingResult[0].id;

      // Add mapping items
      const mappingItems = [
        { service_id: 'aws-lambda', equivalence: 'primary', feature_parity: 0.95, notes: 'Industry standard, most mature offering' },
        { service_id: 'azure-functions', equivalence: 'equivalent', feature_parity: 0.90, notes: 'Strong integration with Microsoft ecosystem' },
        { service_id: 'gcp-cloud-functions', equivalence: 'equivalent', feature_parity: 0.85, notes: 'Good performance, limited runtime options' }
      ];

      for (const item of mappingItems) {
        await query(`
          INSERT INTO service_mapping_items (mapping_id, service_id, equivalence, feature_parity, notes)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT DO NOTHING
        `, [mappingId, item.service_id, item.equivalence, item.feature_parity, item.notes]);
      }
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Database seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database seeding failed:', error);
      process.exit(1);
    });
}

export { seedDatabase };