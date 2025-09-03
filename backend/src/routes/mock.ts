import { Router, Request, Response, NextFunction } from 'express';
import { 
  getMockProviders, 
  getMockProvider, 
  getMockCategories, 
  getMockCategory, 
  getMockServices, 
  getMockService, 
  searchMockServices 
} from '../services/mockData';

const router = Router();

// Providers endpoints
router.get('/providers', (req: Request, res: Response) => {
  const providers = getMockProviders();
  res.json({
    success: true,
    data: providers
  });
});

router.get('/providers/:id', (req: Request, res: Response) => {
  const provider = getMockProvider(req.params.id);
  if (!provider) {
    return res.status(404).json({
      success: false,
      message: 'Provider not found'
    });
  }
  res.json({
    success: true,
    data: provider
  });
});

// Categories endpoints
router.get('/categories', (req: Request, res: Response) => {
  const categories = getMockCategories();
  res.json({
    success: true,
    data: categories
  });
});

router.get('/categories/:id', (req: Request, res: Response) => {
  const category = getMockCategory(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }
  res.json({
    success: true,
    data: category
  });
});

// Services endpoints
router.get('/services/search', (req: Request, res: Response) => {
  const filters = {
    query: req.query.query as string,
    providers: req.query.provider ? (Array.isArray(req.query.provider) ? req.query.provider : [req.query.provider]) : undefined,
    categories: req.query.category ? (Array.isArray(req.query.category) ? req.query.category : [req.query.category]) : undefined,
    features: req.query.features ? (Array.isArray(req.query.features) ? req.query.features : [req.query.features]) : undefined,
    limit: parseInt(req.query.limit as string) || 20,
    offset: parseInt(req.query.offset as string) || 0
  };

  const result = searchMockServices(filters);
  res.json({
    success: true,
    data: result
  });
});

router.get('/services/:id', (req: Request, res: Response) => {
  const service = getMockService(req.params.id);
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }
  res.json({
    success: true,
    data: service
  });
});

router.post('/services/compare', (req: Request, res: Response) => {
  const { serviceIds } = req.body;
  
  if (!serviceIds || !Array.isArray(serviceIds)) {
    return res.status(400).json({
      success: false,
      message: 'Service IDs array is required'
    });
  }

  const services = serviceIds.map(id => getMockService(id)).filter(Boolean);
  
  if (services.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No services found'
    });
  }

  // Build feature matrix
  const allFeatures = new Set<string>();
  services.forEach(service => {
    service?.features.forEach(feature => allFeatures.add(feature));
  });

  const featureMatrix = Array.from(allFeatures).map(feature => {
    const comparison: any = {
      name: feature,
      description: feature.replace(/-/g, ' '),
    };

    services.forEach(service => {
      if (service) {
        comparison[service.provider] = service.features.includes(feature);
      }
    });

    return comparison;
  });

  res.json({
    success: true,
    data: {
      services,
      featureMatrix,
      gaps: [],
      recommendations: []
    }
  });
});

// Search endpoints
router.get('/search/suggestions', (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query) {
    return res.json({
      success: true,
      data: []
    });
  }

  const services = getMockServices();
  const suggestions = services
    .filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.displayName.toLowerCase().includes(query.toLowerCase())
    )
    .map(service => service.displayName)
    .slice(0, 10);

  res.json({
    success: true,
    data: suggestions
  });
});

router.get('/search/popular', (req: Request, res: Response) => {
  const popularSearches = [
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

  res.json({
    success: true,
    data: popularSearches
  });
});

export default router;