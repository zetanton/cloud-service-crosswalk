import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';

  // Log request start
  console.log(`📥 ${method} ${url} - ${ip} - ${userAgent}`);

  // Override res.end to capture response details
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any): Response {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Log response
    const statusEmoji = statusCode >= 500 ? '❌' : statusCode >= 400 ? '⚠️' : '✅';
    console.log(`📤 ${statusEmoji} ${method} ${url} - ${statusCode} - ${duration}ms`);
    
    return originalEnd.call(this, chunk, encoding);
  };

  next();
}