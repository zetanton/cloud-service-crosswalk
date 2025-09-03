import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;

export async function connectRedis(): Promise<RedisClientType> {
  if (client) {
    return client;
  }

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
  client = createClient({
    url: redisUrl,
    socket: {
      connectTimeout: 5000,
    },
  });

  client.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.on('ready', () => {
    console.log('Redis client ready');
  });

  await client.connect();
  return client;
}

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client || !client.isReady) {
    await connectRedis();
  }
  return client;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const redis = await getRedisClient();
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis GET error:', error);
    return null;
  }
}

export async function cacheSet(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.setEx(key, ttlSeconds, JSON.stringify(value));
  } catch (error) {
    console.error('Redis SET error:', error);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.del(key);
  } catch (error) {
    console.error('Redis DELETE error:', error);
  }
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Redis INVALIDATE error:', error);
  }
}