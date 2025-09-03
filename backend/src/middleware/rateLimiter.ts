import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '../config/redis';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

const defaultOptions: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests from this IP, please try again later.',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

export function createRateLimiter(options: Partial<RateLimitOptions> = {}) {
  const opts = { ...defaultOptions, ...options };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const redis = await getRedisClient();
      const key = `rate_limit:${req.ip}`;
      
      const current = await redis.incr(key);
      
      if (current === 1) {
        await redis.expire(key, Math.ceil(opts.windowMs / 1000));
      }
      
      const ttl = await redis.ttl(key);
      
      res.set({
        'X-RateLimit-Limit': opts.maxRequests.toString(),
        'X-RateLimit-Remaining': Math.max(0, opts.maxRequests - current).toString(),
        'X-RateLimit-Reset': new Date(Date.now() + ttl * 1000).toISOString(),
      });
      
      if (current > opts.maxRequests) {
        return res.status(429).json({
          success: false,
          message: opts.message,
          retryAfter: ttl,
        });
      }
      
      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If Redis fails, allow the request to proceed
      next();
    }
  };
}

export const rateLimiter = createRateLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
});