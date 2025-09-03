import { Router, Request, Response, NextFunction } from 'express';
import { query, queryOne } from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';
import { CloudProvider, ProviderRow } from '../types';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Transform database row to API response
function transformProvider(row: ProviderRow): CloudProvider {
  return {
    id: row.id,
    name: row.name,
    displayName: row.display_name,
    logo: row.logo,
    primaryColor: row.primary_color,
    secondaryColor: row.secondary_color,
    website: row.website,
    description: row.description,
    serviceCount: row.service_count,
    marketShare: row.market_share,
    founded: row.founded,
    headquarters: row.headquarters
  };
}

// GET /api/v1/providers
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'providers:all';
    
    // Check cache first
    let providers = await cacheGet<CloudProvider[]>(cacheKey);
    
    if (!providers) {
      const rows = await query<ProviderRow>(`
        SELECT * FROM providers
        ORDER BY market_share DESC
      `);
      
      providers = rows.map(transformProvider);
      
      // Cache for 1 hour
      await cacheSet(cacheKey, providers, 3600);
    }

    res.json({
      success: true,
      data: providers
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/providers/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cacheKey = `provider:${id}`;
    
    // Check cache first
    let provider = await cacheGet<CloudProvider>(cacheKey);
    
    if (!provider) {
      const row = await queryOne<ProviderRow>(`
        SELECT * FROM providers WHERE id = $1
      `, [id]);
      
      if (!row) {
        throw createError('Provider not found', 404);
      }
      
      provider = transformProvider(row);
      
      // Cache for 1 hour
      await cacheSet(cacheKey, provider, 3600);
    }

    res.json({
      success: true,
      data: provider
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/providers/:id/services
router.get('/:id/services', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const cacheKey = `provider:${id}:services:${limit}:${offset}`;
    
    // Check cache first
    let result = await cacheGet<any>(cacheKey);
    
    if (!result) {
      // Verify provider exists
      const providerExists = await queryOne(`
        SELECT id FROM providers WHERE id = $1
      `, [id]);
      
      if (!providerExists) {
        throw createError('Provider not found', 404);
      }
      
      const services = await query(`
        SELECT 
          s.*,
          c.display_name as category_name
        FROM services s
        JOIN categories c ON s.category_id = c.id
        WHERE s.provider_id = $1
        ORDER BY s.name
        LIMIT $2 OFFSET $3
      `, [id, limit, offset]);
      
      const total = await queryOne<{ count: number }>(`
        SELECT COUNT(*) as count FROM services WHERE provider_id = $1
      `, [id]);
      
      result = {
        services,
        total: total?.count || 0,
        hasMore: (offset + limit) < (total?.count || 0)
      };
      
      // Cache for 30 minutes
      await cacheSet(cacheKey, result, 1800);
    }

    res.json({
      success: true,
      data: result.services,
      meta: {
        total: result.total,
        limit,
        offset,
        hasMore: result.hasMore
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;