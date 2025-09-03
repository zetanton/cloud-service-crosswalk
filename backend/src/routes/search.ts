import { Router, Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';

const router = Router();

// GET /api/v1/search/suggestions
router.get('/suggestions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query: searchQuery } = req.query;
    
    if (!searchQuery || typeof searchQuery !== 'string') {
      return res.json({
        success: true,
        data: []
      });
    }

    const cacheKey = `suggestions:${searchQuery.toLowerCase()}`;
    
    // Check cache first
    let suggestions = await cacheGet<string[]>(cacheKey);
    
    if (!suggestions) {
      // Get service name suggestions
      const serviceNames = await query<{ suggestion: string }>(`
        SELECT DISTINCT name as suggestion
        FROM services
        WHERE name ILIKE $1
        ORDER BY name
        LIMIT 10
      `, [`%${searchQuery}%`]);

      // Get display name suggestions
      const displayNames = await query<{ suggestion: string }>(`
        SELECT DISTINCT display_name as suggestion
        FROM services
        WHERE display_name ILIKE $1
        ORDER BY display_name
        LIMIT 10
      `, [`%${searchQuery}%`]);

      // Get category suggestions
      const categories = await query<{ suggestion: string }>(`
        SELECT DISTINCT display_name as suggestion
        FROM categories
        WHERE display_name ILIKE $1
        ORDER BY display_name
        LIMIT 5
      `, [`%${searchQuery}%`]);

      // Get provider suggestions
      const providers = await query<{ suggestion: string }>(`
        SELECT DISTINCT display_name as suggestion
        FROM providers
        WHERE display_name ILIKE $1
        ORDER BY display_name
        LIMIT 5
      `, [`%${searchQuery}%`]);

      // Combine and deduplicate suggestions
      const allSuggestions = [
        ...serviceNames.map(s => s.suggestion),
        ...displayNames.map(s => s.suggestion),
        ...categories.map(s => s.suggestion),
        ...providers.map(s => s.suggestion)
      ];

      suggestions = Array.from(new Set(allSuggestions)).slice(0, 10);
      
      // Cache for 5 minutes
      await cacheSet(cacheKey, suggestions, 300);
    }

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/search/popular
router.get('/popular', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'search:popular';
    
    // Check cache first
    let popularSearches = await cacheGet<string[]>(cacheKey);
    
    if (!popularSearches) {
      // For now, return static popular searches
      // In a real implementation, this would track actual search analytics
      popularSearches = [
        'Lambda',
        'Functions',
        'Storage',
        'Database',
        'Kubernetes',
        'Load Balancer',
        'API Gateway',
        'Machine Learning',
        'Analytics',
        'Security'
      ];
      
      // Cache for 1 hour
      await cacheSet(cacheKey, popularSearches, 3600);
    }

    res.json({
      success: true,
      data: popularSearches
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/search/filters
router.get('/filters', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'search:filters';
    
    // Check cache first
    let filters = await cacheGet(cacheKey);
    
    if (!filters) {
      // Get available filter options
      const providers = await query<{ id: string; name: string; count: number }>(`
        SELECT p.id, p.display_name as name, COUNT(s.id) as count
        FROM providers p
        LEFT JOIN services s ON p.id = s.provider_id
        GROUP BY p.id, p.display_name
        ORDER BY p.display_name
      `);

      const categories = await query<{ id: string; name: string; count: number }>(`
        SELECT c.id, c.display_name as name, COUNT(s.id) as count
        FROM categories c
        LEFT JOIN services s ON c.id = s.category_id
        GROUP BY c.id, c.display_name, c.sort_order
        ORDER BY c.sort_order, c.display_name
      `);

      const maturityLevels = await query<{ level: string; count: number }>(`
        SELECT maturity as level, COUNT(*) as count
        FROM services
        GROUP BY maturity
        ORDER BY 
          CASE maturity
            WHEN 'mature' THEN 1
            WHEN 'stable' THEN 2
            WHEN 'beta' THEN 3
            WHEN 'experimental' THEN 4
            ELSE 5
          END
      `);

      // Get common features
      const featuresResult = await query<{ features: string[] }>(`
        SELECT features FROM services WHERE features IS NOT NULL
      `);

      const featureCounts = new Map<string, number>();
      featuresResult.forEach(row => {
        if (Array.isArray(row.features)) {
          row.features.forEach(feature => {
            featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1);
          });
        }
      });

      const features = Array.from(featureCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      filters = {
        providers,
        categories,
        features,
        maturity: maturityLevels
      };
      
      // Cache for 1 hour
      await cacheSet(cacheKey, filters, 3600);
    }

    res.json({
      success: true,
      data: filters
    });
  } catch (error) {
    next(error);
  }
});

export default router;