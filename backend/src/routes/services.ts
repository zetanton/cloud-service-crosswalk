import { Router, Request, Response, NextFunction } from 'express';
import { query, queryOne } from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';
import { CloudService, ServiceRow, SearchFilters, SearchResult } from '../types';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Transform database row to API response
function transformService(row: ServiceRow): CloudService {
  return {
    id: row.id,
    name: row.name,
    displayName: row.display_name,
    provider: row.provider_id,
    category: row.category_id,
    subCategory: row.sub_category || undefined,
    description: row.description,
    longDescription: row.long_description || undefined,
    icon: row.icon,
    logo: row.logo,
    features: row.features || [],
    pricing: row.pricing || { model: 'contact' },
    regions: row.regions || [],
    sla: row.sla || { uptime: 0, description: 'Not specified' },
    useCases: row.use_cases || [],
    limitations: row.limitations || [],
    integrations: row.integrations || [],
    sdk: row.sdk || [],
    api: row.api || { rest: false, sdk: false, cli: false },
    maturity: row.maturity as any || 'stable',
    launchDate: row.launch_date?.toISOString().split('T')[0] || '',
    lastUpdated: row.last_updated?.toISOString() || ''
  };
}

// GET /api/v1/services/search
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: SearchFilters = {
      query: req.query.query as string,
      providers: req.query.provider ? (Array.isArray(req.query.provider) ? req.query.provider as string[] : [req.query.provider as string]) : undefined,
      categories: req.query.category ? (Array.isArray(req.query.category) ? req.query.category as string[] : [req.query.category as string]) : undefined,
      subCategories: req.query.subCategory ? (Array.isArray(req.query.subCategory) ? req.query.subCategory as string[] : [req.query.subCategory as string]) : undefined,
      features: req.query.features ? (Array.isArray(req.query.features) ? req.query.features as string[] : [req.query.features as string]) : undefined,
      pricingModel: req.query.pricingModel ? (Array.isArray(req.query.pricingModel) ? req.query.pricingModel as string[] : [req.query.pricingModel as string]) : undefined,
      maturity: req.query.maturity ? (Array.isArray(req.query.maturity) ? req.query.maturity as string[] : [req.query.maturity as string]) : undefined,
      limit: parseInt(req.query.limit as string) || 20,
      offset: parseInt(req.query.offset as string) || 0
    };

    const cacheKey = `search:${JSON.stringify(filters)}`;
    
    // Check cache first
    let result = await cacheGet<SearchResult>(cacheKey);
    
    if (!result) {
      // Build dynamic query
      let whereConditions: string[] = [];
      let queryParams: any[] = [];
      let paramIndex = 1;

      // Text search
      if (filters.query) {
        whereConditions.push(`
          (s.name ILIKE $${paramIndex} OR 
           s.display_name ILIKE $${paramIndex} OR 
           s.description ILIKE $${paramIndex})
        `);
        queryParams.push(`%${filters.query}%`);
        paramIndex++;
      }

      // Provider filter
      if (filters.providers?.length) {
        whereConditions.push(`s.provider_id = ANY($${paramIndex})`);
        queryParams.push(filters.providers);
        paramIndex++;
      }

      // Category filter
      if (filters.categories?.length) {
        whereConditions.push(`s.category_id = ANY($${paramIndex})`);
        queryParams.push(filters.categories);
        paramIndex++;
      }

      // Sub-category filter
      if (filters.subCategories?.length) {
        whereConditions.push(`s.sub_category = ANY($${paramIndex})`);
        queryParams.push(filters.subCategories);
        paramIndex++;
      }

      // Features filter
      if (filters.features?.length) {
        whereConditions.push(`s.features ?& $${paramIndex}`);
        queryParams.push(filters.features);
        paramIndex++;
      }

      // Maturity filter
      if (filters.maturity?.length) {
        whereConditions.push(`s.maturity = ANY($${paramIndex})`);
        queryParams.push(filters.maturity);
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      // Get services
      const services = await query<ServiceRow>(`
        SELECT s.*, p.display_name as provider_name, c.display_name as category_name
        FROM services s
        JOIN providers p ON s.provider_id = p.id
        JOIN categories c ON s.category_id = c.id
        ${whereClause}
        ORDER BY s.name
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `, [...queryParams, filters.limit, filters.offset]);

      // Get total count
      const totalResult = await queryOne<{ count: number }>(`
        SELECT COUNT(*) as count
        FROM services s
        ${whereClause}
      `, queryParams);

      const total = totalResult?.count || 0;

      // Get filter aggregations
      const providerCounts = await query<{ id: string; count: number }>(`
        SELECT s.provider_id as id, COUNT(*) as count
        FROM services s
        ${whereClause}
        GROUP BY s.provider_id
        ORDER BY count DESC
      `, queryParams);

      const categoryCounts = await query<{ id: string; count: number }>(`
        SELECT s.category_id as id, COUNT(*) as count
        FROM services s
        ${whereClause}
        GROUP BY s.category_id
        ORDER BY count DESC
      `, queryParams);

      result = {
        services: services.map(transformService),
        total,
        hasMore: (filters.offset || 0) + (filters.limit || 20) < total,
        filters: {
          providers: providerCounts,
          categories: categoryCounts,
          features: [],
          maturity: []
        }
      };

      // Cache for 15 minutes
      await cacheSet(cacheKey, result, 900);
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/services/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cacheKey = `service:${id}`;
    
    // Check cache first
    let service = await cacheGet<CloudService>(cacheKey);
    
    if (!service) {
      const row = await queryOne<ServiceRow>(`
        SELECT s.*, p.display_name as provider_name, c.display_name as category_name
        FROM services s
        JOIN providers p ON s.provider_id = p.id
        JOIN categories c ON s.category_id = c.id
        WHERE s.id = $1
      `, [id]);
      
      if (!row) {
        throw createError('Service not found', 404);
      }
      
      service = transformService(row);
      
      // Cache for 1 hour
      await cacheSet(cacheKey, service, 3600);
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/services/compare
router.post('/compare', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serviceIds, includeFeatures = true, includePricing = true } = req.body;
    
    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length < 2) {
      throw createError('At least 2 service IDs are required for comparison', 400);
    }

    if (serviceIds.length > 5) {
      throw createError('Maximum 5 services can be compared at once', 400);
    }

    const cacheKey = `comparison:${serviceIds.sort().join(',')}:${includeFeatures}:${includePricing}`;
    
    // Check cache first
    let result = await cacheGet(cacheKey);
    
    if (!result) {
      // Get services
      const services = await query<ServiceRow>(`
        SELECT s.*, p.display_name as provider_name, c.display_name as category_name
        FROM services s
        JOIN providers p ON s.provider_id = p.id
        JOIN categories c ON s.category_id = c.id
        WHERE s.id = ANY($1)
        ORDER BY s.provider_id, s.name
      `, [serviceIds]);

      if (services.length !== serviceIds.length) {
        throw createError('One or more services not found', 404);
      }

      const transformedServices = services.map(transformService);

      // Build feature matrix if requested
      let featureMatrix: any[] = [];
      if (includeFeatures) {
        const allFeatures = new Set<string>();
        transformedServices.forEach(service => {
          service.features.forEach(feature => allFeatures.add(feature));
        });

        featureMatrix = Array.from(allFeatures).map(feature => {
          const comparison: any = {
            name: feature,
            description: feature.replace(/-/g, ' '),
          };

          transformedServices.forEach(service => {
            const providerKey = service.provider;
            comparison[providerKey] = service.features.includes(feature);
          });

          return comparison;
        });
      }

      result = {
        services: transformedServices,
        featureMatrix,
        gaps: [], // TODO: Implement gap analysis
        recommendations: [] // TODO: Implement recommendations
      };

      // Cache for 30 minutes
      await cacheSet(cacheKey, result, 1800);
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

export default router;