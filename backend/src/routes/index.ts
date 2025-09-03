import { Router } from 'express';
import providersRouter from './providers';
import categoriesRouter from './categories';
import servicesRouter from './services';
import searchRouter from './search';

const router = Router();

// API documentation
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cloud Service Crosswalk API v1',
    endpoints: {
      providers: '/providers',
      categories: '/categories',
      services: '/services',
      search: '/search'
    },
    documentation: 'https://api.cloudcrosswalk.com/docs'
  });
});

// Route handlers
router.use('/providers', providersRouter);
router.use('/categories', categoriesRouter);
router.use('/services', servicesRouter);
router.use('/search', searchRouter);

export default router;