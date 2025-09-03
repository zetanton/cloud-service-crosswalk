import { connectDatabase, query } from '../config/database';

const migrations = [
  // Migration 1: Create providers table
  `
  CREATE TABLE IF NOT EXISTS providers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NOT NULL,
    website VARCHAR(500),
    description TEXT,
    service_count INTEGER DEFAULT 0,
    market_share DECIMAL(5,2),
    founded INTEGER,
    headquarters VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,

  // Migration 2: Create categories table
  `
  CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    parent_category VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category) REFERENCES categories(id)
  );
  `,

  // Migration 3: Create services table
  `
  CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    provider_id VARCHAR(50) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    sub_category VARCHAR(100),
    description TEXT,
    long_description TEXT,
    icon VARCHAR(50),
    logo VARCHAR(500),
    features JSONB DEFAULT '[]',
    pricing JSONB DEFAULT '{}',
    regions JSONB DEFAULT '[]',
    sla JSONB DEFAULT '{}',
    use_cases JSONB DEFAULT '[]',
    limitations JSONB DEFAULT '[]',
    integrations JSONB DEFAULT '[]',
    sdk JSONB DEFAULT '[]',
    api JSONB DEFAULT '{}',
    maturity VARCHAR(50) DEFAULT 'stable',
    launch_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
  `,

  // Migration 4: Create service mappings table
  `
  CREATE TABLE IF NOT EXISTS service_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    sub_category VARCHAR(100),
    description TEXT,
    common_features JSONB DEFAULT '[]',
    differentiating_features JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
  `,

  // Migration 5: Create service mapping items table
  `
  CREATE TABLE IF NOT EXISTS service_mapping_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mapping_id UUID NOT NULL,
    service_id VARCHAR(100) NOT NULL,
    equivalence VARCHAR(50) NOT NULL CHECK (equivalence IN ('primary', 'equivalent', 'alternative', 'partial')),
    feature_parity DECIMAL(3,2) DEFAULT 1.0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mapping_id) REFERENCES service_mappings(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
  );
  `,

  // Migration 6: Create feature comparisons table
  `
  CREATE TABLE IF NOT EXISTS feature_comparisons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mapping_id UUID NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    feature_description TEXT,
    aws BOOLEAN DEFAULT false,
    azure BOOLEAN DEFAULT false,
    gcp BOOLEAN DEFAULT false,
    alibaba BOOLEAN DEFAULT false,
    ibm BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mapping_id) REFERENCES service_mappings(id) ON DELETE CASCADE
  );
  `,

  // Migration 7: Create indexes for performance
  `
  CREATE INDEX IF NOT EXISTS idx_services_provider ON services(provider_id);
  CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
  CREATE INDEX IF NOT EXISTS idx_services_sub_category ON services(sub_category);
  CREATE INDEX IF NOT EXISTS idx_services_maturity ON services(maturity);
  CREATE INDEX IF NOT EXISTS idx_services_features ON services USING GIN(features);
  CREATE INDEX IF NOT EXISTS idx_service_mappings_category ON service_mappings(category_id);
  CREATE INDEX IF NOT EXISTS idx_service_mapping_items_mapping ON service_mapping_items(mapping_id);
  CREATE INDEX IF NOT EXISTS idx_service_mapping_items_service ON service_mapping_items(service_id);
  CREATE INDEX IF NOT EXISTS idx_feature_comparisons_mapping ON feature_comparisons(mapping_id);
  `,

  // Migration 8: Create search indexes
  `
  CREATE INDEX IF NOT EXISTS idx_services_search ON services USING GIN(
    to_tsvector('english', name || ' ' || display_name || ' ' || COALESCE(description, ''))
  );
  `,
];

async function runMigrations() {
  try {
    await connectDatabase();
    console.log('🔄 Running database migrations...');

    for (let i = 0; i < migrations.length; i++) {
      console.log(`📝 Running migration ${i + 1}/${migrations.length}...`);
      await query(migrations[i]);
    }

    console.log('✅ All migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('✅ Database migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database migration failed:', error);
      process.exit(1);
    });
}

export { runMigrations };