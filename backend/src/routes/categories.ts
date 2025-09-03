import { Router, Request, Response, NextFunction } from 'express';
import { query, queryOne } from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';
import { ServiceCategory, CategoryRow } from '../types';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Transform database row to API response
function transformCategory(row: CategoryRow): ServiceCategory {
  return {
    id: row.id,
    name: row.name,
    displayName: row.display_name,
    icon: row.icon,
    description: row.description,
    parentCategory: row.parent_category || undefined,
    sortOrder: row.sort_order
  };
}

// GET /api/v1/categories
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'categories:all';
    
    // Check cache first
    let categories = await cacheGet<ServiceCategory[]>(cacheKey);
    
    if (!categories) {
      const rows = await query<CategoryRow>(`
        SELECT * FROM categories
        ORDER BY sort_order ASC, name ASC
      `);
      
      categories = rows.map(transformCategory);
      
      // Cache for 2 hours
      await cacheSet(cacheKey, categories, 7200);
    }

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/categories/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cacheKey = `category:${id}`;
    
    // Check cache first
    let category = await cacheGet<ServiceCategory>(cacheKey);
    
    if (!category) {
      const row = await queryOne<CategoryRow>(`
        SELECT * FROM categories WHERE id = $1
      `, [id]);
      
      if (!row) {
        throw createError('Category not found', 404);
      }
      
      category = transformCategory(row);
      
      // Cache for 2 hours
      await cacheSet(cacheKey, category, 7200);
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/categories/:id/services
router.get('/:id/services', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const cacheKey = `category:${id}:services:${limit}:${offset}`;
    
    // Check cache first
    let result = await cacheGet<any>(cacheKey);
    
    if (!result) {
      // Verify category exists
      const categoryExists = await queryOne(`
        SELECT id FROM categories WHERE id = $1
      `, [id]);
      
      if (!categoryExists) {
        throw createError('Category not found', 404);
      }
      
      const services = await query(`
        SELECT 
          s.*,
          p.display_name as provider_name
        FROM services s
        JOIN providers p ON s.provider_id = p.id
        WHERE s.category_id = $1
        ORDER BY s.provider_id, s.name
        LIMIT $2 OFFSET $3
      `, [id, limit, offset]);
      
      const total = await queryOne<{ count: number }>(`
        SELECT COUNT(*) as count FROM services WHERE category_id = $1
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