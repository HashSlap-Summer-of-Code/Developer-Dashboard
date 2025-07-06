class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 3600000) { // Default 1 hour TTL
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.cache.has(key) && Date.now() <= this.cache.get(key).expiry;
  }
}

export const cache = new Cache();

export const withCache = async (key, fn, ttl = 3600000) => {
  const cached = cache.get(key);
  if (cached) return cached;
  
  const result = await fn();
  cache.set(key, result, ttl);
  return result;
}; 